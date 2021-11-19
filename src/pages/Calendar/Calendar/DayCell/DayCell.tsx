import React, {ReactElement, useEffect} from 'react';

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
    event?: CalendarCellEvent;
}

const DayCell = (props: DayCellProps): ReactElement => {

  const onClickCell = (): void => {
    //
  }


  return (
    <div className="dayCell" onClick = {onClickCell}>
      <div className="dayWrapper">{props.day}</div>
      <div className="eventWrapper">
        {props.event && <div className = "event_item">{props.event.name}</div>}
      </div>
    </div>
  );
};

export default DayCell;
