import React, {ReactElement} from 'react';
import './style.scss';
import MyLabel from '../../../components/Label/MyLabel';
import PartnerLabel from '../../../components/Label/PartnerLabel';
import {EventType} from '../Calendar/DayCell/DayCell';
import HolidayLabel from '../../../components/Label/HolidayLabel';

interface EventDetailProps {
  year: number;
  month: number;
  day: number;
}

const EventDetail = (props: EventDetailProps): ReactElement => {
  return (
    <section className="section_detail">
      <div className='showDate'>{`${props.year}년 ${props.month + 1}월 ${props.day}일`}</div>
      <ul className='eventContainer'>
        <li className='eventItem'>
          <div className='title'>공휴일1</div>
          <div className='time'>시간: 01:00 ~ 02:00</div>
          <div className="memo">메모: 2022년 첫 설날!</div>
          <MemberShower eventType = {EventType.HOLIDAY}/>
        </li>
        <li className='eventItem'>
          <div className='title'>개인일정1</div>
          <div className='time'>시간: 01:00 ~ 02:00</div>
          <div className="memo">메모: 2022년 첫 설날!</div>
          <MemberShower eventType = {EventType.PERSONAL}/>
        </li>
        <li className='eventItem'>
          <div className='title'>커플일정1</div>
          <div className='time'>시간: 01:00 ~ 02:00</div>
          <div className="memo">메모: 2022년 첫 설날!</div>
          <MemberShower eventType = {EventType.COUPLE}/>
        </li>
      </ul>
    </section>
  );
}

interface MemberShowerProps {
  eventType: EventType;
}

// eventType에 따라 member / eventLabel 보여줌
const MemberShower = ({eventType}: MemberShowerProps): ReactElement => {
  return (
    <div className='memberContainer'>
      {eventType === EventType.HOLIDAY && <HolidayLabel/>}
      {/* 공휴일 아닐 때는 항상 포함 */}
      {eventType !== EventType.HOLIDAY && <MyLabel/>}
      {eventType === EventType.COUPLE && <PartnerLabel/>}
    </div>
  )
}

export default EventDetail;