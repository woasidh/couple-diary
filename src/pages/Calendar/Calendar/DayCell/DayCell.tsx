import React, { ReactElement } from 'react';

interface DayCellProps {
    day: number | null
}

const DayCell = ({ day }: DayCellProps): ReactElement => (
  <div className="dayCell">
    <div className="dayWrapper">{day}</div>
    <div className="eventWrapper" />
  </div>
);

export default DayCell;
