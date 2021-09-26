import React from 'react';

interface DayCellProps {
    day: number | null
}

const DayCell = ({day}: DayCellProps) => {
    return (
        <div className="dayCell">
            <div className="dayWrapper">{day}</div>
            <div className="eventWrapper"/>
        </div>
    );
}

export default DayCell;