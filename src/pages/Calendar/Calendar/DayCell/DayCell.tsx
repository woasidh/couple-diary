import React, {ReactElement} from 'react';
import {CalendarEventData} from '../../../../redux_module/CalendarEvent';

interface DayCellProps {
  day: number | null;
  event?: Array<CalendarEventData> | null;
  onClick: (date: number) => void;
}

const DayCell = (props: DayCellProps): ReactElement => {

  const onCellClick = (_: any): void => {
    if (typeof props.day === 'number') {
      props.onClick(props.day);
    }
  }

  const renderItems = (): Array<ReactElement> | ReactElement => {
    if (props.event) {
      return props.event.map((event, idx) => (<div className="event_item" key = {idx}>{event.name}</div>));
    } else return <></>;
  }

  return (
    <div className="dayCell" onClick={onCellClick}>
      <div className="dayWrapper">{props.day}</div>
      <div className="eventWrapper">
        {props.event && renderItems()}
      </div>
    </div>
  );
};

export default DayCell;
