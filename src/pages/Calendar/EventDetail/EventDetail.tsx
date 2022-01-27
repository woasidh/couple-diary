import React, {ReactElement} from 'react';
import './style.scss';
import Label, {LabelSize, LabelType} from '../../../components/Label/Label';
import {CalendarEventData, CalendarEventType} from '../../../redux_module/CalendarEvent';
import {StringUtil} from '../../../util/StringUtil';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux_module';
import {PopupUtil} from '../../../components/Util/PopupUtil';

interface EventDetailProps {
  year: number;
  month: number;
  day: number;
}

const EventDetail = (props: EventDetailProps): ReactElement => {

  const calendarEventMap = useSelector((state: RootState) => state.calendarEvent.eventMap);

  const onClickDetail = (event: CalendarEventData): void => {
    if (event.type === CalendarEventType.HOLIDAY) return;
    PopupUtil.showEventAddPopup((date: string, event: CalendarEventData) => {
      console.log(date, event);
    }, event, StringUtil.dateToString(props.year, props.month + 1, props.day))
  }

  const renderEventItem = (): ReactElement => {
    const events = calendarEventMap.get(StringUtil.dateToString(props.year, props.month + 1, props.day));
    return (
      <>
        {events ? events.map((event, idx) => (
          <li className={`eventItem ${event.type === CalendarEventType.HOLIDAY ? '' : 'clickable'}`} key={idx} onClick={(): void => onClickDetail(event)}>
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