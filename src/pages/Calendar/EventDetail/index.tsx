import React, {ReactElement, useEffect} from 'react';
import './style.scss';
import {EventType} from '../Calendar/DayCell/DayCell';
import Label, {LabelSize, LabelType} from '../../../components/Label/Label';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux_module';
import {addCalendarEvent} from '../../../redux_module/CalendarEvent';

interface EventDetailProps {
  year: number;
  month: number;
  day: number;
}

const EventDetail = (props: EventDetailProps): ReactElement => {

  const dispatch = useDispatch();
  const calendarData = useSelector((state: RootState) => state.calendarEvent);

  useEffect(() => {
    const sampleEventData = {
      name: 'sample data',
      memo: 'sample memo'
    };

    dispatch(addCalendarEvent('20220101', sampleEventData));
  }, []);


  return (
    <section className="section_detail">
      <div className='showDate'>{`${props.year}년 ${props.month + 1}월 ${props.day}일`}</div>
      <ul className='eventContainer'>
        {/* todo 메소드 하나로 통합하기 */}
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
          {calendarData.eventMap.size}
        </li>
      </ul>
    </section>
  );
}
// eventType에 따라 member / eventLabel 보여줌
const MemberShower = ({eventType}: {eventType: EventType}): ReactElement => {
  return (
    <div className='memberContainer'>
      {eventType === EventType.HOLIDAY && <Label labelType = {LabelType.EVENT_HOLIDAY} size = {LabelSize.SMALL}/>}
      {/* 공휴일 아닐 때는 항상 포함 */}
      {eventType !== EventType.HOLIDAY && <Label labelType = {LabelType.MEMBER_SELF} size = {LabelSize.SMALL}/>}
      {eventType === EventType.COUPLE && <Label labelType = {LabelType.MEMBER_PARTNER} size = {LabelSize.SMALL}/>}
    </div>
  )
}

export default EventDetail;