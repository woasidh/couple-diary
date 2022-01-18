import React, {ReactElement, useEffect} from 'react';
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
          <div className='time'>시간: 01:00 ~ 02:00</div>
          <div className="memo">메모: 2022년 첫 설날!</div>
          <MemberShower eventType = {CalendarEventType.HOLIDAY}/>
        </li>
      )) : <></>}
      </>
    );
  }

  return (
    <section className="section_detail">
      <div className='showDate'>{`${props.year}년 ${props.month + 1}월 ${props.day}일`}</div>
      <ul className='eventContainer'>
        {/* todo 메소드 하나로 통합하기 */}
        {renderEventItem()}
        {/*<li className='eventItem'>*/}
        {/*  <div className='title'>공휴일1</div>*/}
        {/*  <div className='time'>시간: 01:00 ~ 02:00</div>*/}
        {/*  <div className="memo">메모: 2022년 첫 설날!</div>*/}
        {/*  <MemberShower eventType = {CalendarEventType.HOLIDAY}/>*/}
        {/*</li>*/}
        {/*<li className='eventItem'>*/}
        {/*  <div className='title'>개인일정1</div>*/}
        {/*  <div className='time'>시간: 01:00 ~ 02:00</div>*/}
        {/*  <div className="memo">메모: 2022년 첫 설날!</div>*/}
        {/*  <MemberShower eventType = {CalendarEventType.PERSONAL}/>*/}
        {/*</li>*/}

        {/*<li className='eventItem'>*/}
        {/*  <div className='title'>커플일정1</div>*/}
        {/*  <div className='time'>시간: 01:00 ~ 02:00</div>*/}
        {/*  <div className="memo">메모: 2022년 첫 설날!</div>*/}
        {/*  <MemberShower eventType = {CalendarEventType.COUPLE}/>*/}
        {/*</li>*/}
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