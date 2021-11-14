import React, { ReactElement } from 'react';

export enum EventType {
  NORMAL
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
        <div></div>
      </div>
    </div>
  );
};

export default DayCell;
