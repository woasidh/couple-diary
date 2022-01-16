import React, {ReactElement} from 'react';
import './style.scss';
import MyLabel from '../../../components/MemberLabel/MemberLabel/MyLabel';
import PartnerLabel from '../../../components/MemberLabel/MemberLabel/PartnerLabel';

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
          <div className='title'>설날</div>
          <div className='time'>시간: 01:00 ~ 02:00</div>
          <div className="memo">메모: 2022년 첫 설날!</div>
          <MemberShower/>
        </li>
        <li className='eventItem'>
          <div className='title'>설날</div>
          <div className='time'>시간: 01:00 ~ 02:00</div>
          <div className="memo">메모: 2022년 첫 설날!</div>
          <MemberShower/>
        </li>
      </ul>
    </section>
  );
}

const MemberShower = (): ReactElement => {
  return (
    <div className='memberContainer'>
      <MyLabel/>
      <PartnerLabel/>
    </div>
  )
}

export default EventDetail;