import React, {ReactElement} from 'react';
import './style.scss';
import Label, {LabelSize, LabelType} from '../../../components/Label/Label';
import {CalendarEventData, CalendarEventType, changeCalendarEvent} from '../../../redux_module/CalendarEvent';
import {StringUtil} from '../../../util/StringUtil';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux_module';
import {PopupUtil} from '../../../components/Util/PopupUtil';
import axios from 'axios';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';

interface EventDetailProps {
  year: number;
  month: number;
  day: number;
}

const EventDetail = (props: EventDetailProps): ReactElement => {

  const date = StringUtil.dateToString(props.year, props.month + 1, props.day);

  const dispatch = useDispatch();

  const calendarEventMap = useSelector((state: RootState) => state.calendarEvent.eventMap);

  const onClickDetail = (prevEvent: CalendarEventData, id: number | undefined): void => {
    if (!id) return;
    PopupUtil.showEventAddPopup((newDate: string, newEvent: CalendarEventData) => {
      console.log(newDate, newEvent);
      axios.patch(`/api/calendar/${newEvent.type.toLowerCase()}`, {
        id,
        title: newEvent.name,
        date: newDate,
        startTime: newEvent.time ? newEvent.time[0] : null,
        endTime: newEvent.time ? newEvent.time[1] : null,
        memo: newEvent.memo
      })
        .then((res) => {
          if (!res.data.success) {
            PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err);
          }
          console.log(id);
          dispatch(changeCalendarEvent(date, newDate, {...newEvent, num: id}));
        })
        .catch(e => PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString()));
    }, prevEvent, date)
  }

  const renderEventItem = (): ReactElement => {
    const events = calendarEventMap.get(date);
    return (
      <>
        {/* todo key로 idx 넘겼는데 안좋음 -> 고유 id로 해야되는데 holiday는 id없어서 처리해야 함 */}
        {events ? events.map((event, idx) => (
          <li className={`eventItem ${event.type === CalendarEventType.HOLIDAY ? '' : 'clickable'}`} key={idx} onClick={(): void => onClickDetail(event, event.num)}>
            <div className='title'>{event.name}</div>
            <div
              className='time'>시간: {event.time ? `${StringUtil.parseDateToMinute(event.time[0])} ~ ${StringUtil.parseDateToMinute(event.time[1])}` : ' -'}</div>
            <div className="memo">메모: {event.memo ? event.memo : ' -'}</div>
            <MemberShower eventType={event.type}/>
            {event.num}
          </li>
        )) : <></>}
      </>
    );
  }

  return (
    <section className="section_detail">
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