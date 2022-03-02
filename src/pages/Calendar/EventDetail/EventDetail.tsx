import React, {ReactElement} from 'react';
import './style.scss';
import './MobileEventDetail.scss';
import Label, {LabelSize, LabelType} from '../../../components/Label/Label';
import {
  CalendarEventData,
  CalendarEventType
} from '../../../reducers/CalendarEvent';
import {StringUtil} from '../../../shared/util/StringUtil';

interface EventDetailProps {
  year: number;
  month: number;
  day: number;
  openModal: boolean;
  onClickEventDetail: (prevEvent: CalendarEventData, id: number | undefined) => any;
  events: Array<CalendarEventData> | undefined;
}

const EventDetail = (props: EventDetailProps): ReactElement => {
  const renderEventItem = (): ReactElement => {
    return (
      <>
        {/* todo key로 idx 넘겼는데 안좋음 -> 고유 id로 해야되는데 holiday는 id없어서 처리해야 함 */}
        {props.events ? props.events.map((event, idx) => (
          <li className={`eventItem ${event.type === CalendarEventType.HOLIDAY ? '' : 'clickable'}`} key={idx}
              onClick={(): void => props.onClickEventDetail(event, event.id)}>
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