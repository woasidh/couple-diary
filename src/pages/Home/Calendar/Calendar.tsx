import React, {ReactElement} from 'react';
import DayCell from "./DayCell/DayCell";

const Calendar = () => {

    function renderWeekdayRow(): ReactElement {
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <div className="weekdayRow">
                {weekdays.map((weekday, index) => (
                    <div className="weekDayCell" key={index}>{weekday}</div>
                ))}
            </div>
        );
    }

    function renderWeekRow(): ReactElement {
        return (
            <div className="weekRow">
                {[0, 1, 2, 3, 4, 5, 6].map(() => (<DayCell/>))}
            </div>
        );
    }

    function renderWeekRows(): Array<ReactElement> {
        return (
            [0, 1, 2, 3, 4].map(() => renderWeekRow())
        );
    }

    return (
        <div className="calendar">
            <div className="weekRows">
                {renderWeekdayRow()}
                {renderWeekRows()}
            </div>
        </div>
    );
}

export default Calendar;