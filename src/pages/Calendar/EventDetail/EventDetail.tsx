import React, {ReactElement} from 'react';
import './style.scss';
import './MobileEventDetail.scss';
import Label, {LabelSize, LabelType} from '../../../components/Label/Label';
import {
  CalendarEventData,
  CalendarEventType,
  changeCalendarEvent,
  deleteCalendarEvent
} from '../../../reducers/CalendarEvent';
import {StringUtil} from '../../../shared/util/StringUtil';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {PopupUtil} from '../../../shared/hoc/PopupUtil';
import axios from 'axios';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';

interface EventDetailProps {
  year: number;
  month: number;
  day: number;
  openModal: boolean;
}

const EventDetail = (props: EventDetailProps): ReactElement => {

  const date = StringUtil.dateToString(props.year, props.month + 1, props.day);

  const dispatch = useDispatch();
  const calendarEventMap = useSelector((state: RootState) => state.calendarEvent.eventMap);

  // 이벤트 수정 api call하는 메소드
  const callPatchEventApi = (newDate: string, newEvent: CalendarEventData): void => {
    const data = {
      id: newEvent.id,
      title: newEvent.name,
      date: newDate,
      startTime: newEvent.time ? newEvent.time[0] : null,
      endTime: newEvent.time ? newEvent.time[1] : null,
      memo: newEvent.memo
    }
    axios.patch(process.env.REACT_APP_DB_HOST+`/api/calendar/${newEvent.type.toLowerCase()}`, data, { withCredentials: true })
    .then((res) => {
      if (!res.data.success) PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err);
      dispatch(changeCalendarEvent(date, newDate, {...newEvent, id: newEvent.id}));
    })
    .catch(e => PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString()));
  }

  // 이벤트 삭제 api call하는 메소드
  const callDeleteEventApi = (id: number, eventType: CalendarEventType): void => {
    axios.delete(process.env.REACT_APP_DB_HOST+`/api/calendar/${eventType.toLowerCase()}/?id=${id}`, { withCredentials: true })
    .then(res => {
      if (!res.data.success) PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err);
      dispatch(deleteCalendarEvent(id, eventType, date));
    })
    .catch(e => PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString()))
  }

  const onClickDetail = (prevEvent: CalendarEventData, id: number | undefined): void => {
    if (!id) return;
    PopupUtil.showEventAddPopup(callPatchEventApi, prevEvent, date, callDeleteEventApi)
  }

  const renderEventItem = (): ReactElement => {
    const events = calendarEventMap.get(date);
    return (
      <>
        {/* todo key로 idx 넘겼는데 안좋음 -> 고유 id로 해야되는데 holiday는 id없어서 처리해야 함 */}
        {events ? events.map((event, idx) => (
          <li className={`eventItem ${event.type === CalendarEventType.HOLIDAY ? '' : 'clickable'}`} key={idx}
              onClick={(): void => onClickDetail(event, event.id)}>
            <div className='title'>{event.name}</div>
            <div
              className='time'>시간: {event.time ? `${StringUtil.parseDateToMinute(event.time[0])} ~ ${StringUtil.parseDateToMinute(event.time[1])}` : ' -'}</div>
            <div className="memo">메모: {event.memo ? event.memo : ' -'}</div>
            <MemberShower eventType={event.type}/>
          </li>
        )) : <></>}
      </>
    );
  }

  return (
    <section className = {`section_detail ${props.openModal ? 'open' : 'close'}`}>
      <div className='showDate'>{`${props.year}년 ${props.month + 1}월 ${props.day}일`}</div>
      <ul className='eventContainer'>
        {/* todo(done) 메소드 하나로 통합하기 */}
        {renderEventItem()}
      </ul>
    </section>
  );
}

// eventType에 따라 member / eventLabel 보여줌
const MemberShower = ({eventType}: { eventType: CalendarEventType }): ReactElement => {
  return (
    <div className='memberContainer'>
      {eventType === CalendarEventType.HOLIDAY && <Label labelType={LabelType.EVENT_HOLIDAY} size={LabelSize.SMALL}/>}
      {/* 공휴일 아닐 때는 항상 포함 */}
      {eventType !== CalendarEventType.HOLIDAY && <Label labelType={LabelType.MEMBER_SELF} size={LabelSize.SMALL}/>}
      {eventType === CalendarEventType.COUPLE && <Label labelType={LabelType.MEMBER_PARTNER} size={LabelSize.SMALL}/>}
    </div>
  )
}

export default EventDetail;