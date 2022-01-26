import React, {ReactElement} from 'react';
import './style.scss';
import Label, {LabelSize, LabelType} from '../../../components/Label/Label';
import { CalendarEventType } from '../../../redux_module/CalendarEvent';
import {StringUtil} from '../../../util/StringUtil';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux_module';

interface EventDetailProps {
  year: number;
  month: number;
  day: number;
}

const EventDetail = (props: EventDetailProps): ReactElement => {

  const calendarEventMap = useSelector((state: RootState) => state.calendarEvent.eventMap);

  const renderEventItem = (): ReactElement => {
    const events = calendarEventMap.get(StringUtil.dateToString(props.year, props.month + 1, props.day));
    return (
      <>
        {events ? events.map((event, idx) => (
        <li className='eventItem' key = {idx}>
          <div className='title'>{event.name}</div>
          <div className='time'>시간: {event.time ? `${StringUtil.parseDateToMinute(event.time[0])} ~ ${StringUtil.parseDateToMinute(event.time[1])}` : ' -'}</div>
          {/*<div className='time'>시간: a</div>*/}
          <div className="memo">메모: {event.memo ? event.memo : ' -'}</div>
          <MemberShower eventType = {event.type}/>
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
const MemberShower = ({eventType}: {eventType: CalendarEventType}): ReactElement => {
  return (
    <div className='memberContainer'>
      {eventType === CalendarEventType.HOLIDAY && <Label labelType = {LabelType.EVENT_HOLIDAY} size = {LabelSize.SMALL}/>}
      {/* 공휴일 아닐 때는 항상 포함 */}
      {eventType !== CalendarEventType.HOLIDAY && <Label labelType = {LabelType.MEMBER_SELF} size = {LabelSize.SMALL}/>}
      {eventType === CalendarEventType.COUPLE && <Label labelType = {LabelType.MEMBER_PARTNER} size = {LabelSize.SMALL}/>}
    </div>
  )
}

export default EventDetail;