import React, {ReactElement} from 'react';
import './style.scss';

interface EventDetailProps {
  year: number;
  month: number;
  day: number;
}

const EventDetail = (props: EventDetailProps): ReactElement => {
  return (
    <section className = "section_detail">
      <div className = 'showDate'>{`${props.year}년 ${props.month + 1}월 ${props.day}일`}</div>
    </section>
  );
}

export default EventDetail;