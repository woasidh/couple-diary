import React, {ReactElement} from 'react';

export enum EventType {
  NORMAL,
  HOLIDAY
}

export interface CalendarCellEvent {
  name: string;
  type: EventType;
}

interface DayCellProps {
  day: number | null;
  event?: CalendarCellEvent | null;
  onClick: (date: number) => void;
}

const DayCell = (props: DayCellProps): ReactElement => {

  const onCellClick = (e: any): void => {
    if (typeof props.day === 'number') {
      props.onClick(props.day);
    }
  }

  return (
    <div className="dayCell" onClick={onCellClick}>
      <div className="dayWrapper">{props.day}</div>
      <div className="eventWrapper">
        {props.event && <div className="event_item">{props.event.name}</div>}
      </div>
    </div>
  );
};

export default DayCell;
