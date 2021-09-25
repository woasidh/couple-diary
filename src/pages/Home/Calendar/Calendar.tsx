import React, {ReactElement} from 'react';

const Calendar = () => {

    function renderWeekdayRow(): ReactElement {
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <div className="weekdayRow">
                {weekdays.map((weekday, index) => (
                    <div className="weekDayCell" key = {index}>{weekday}</div>
                ))}
            </div>
        );
    }

    return (
        <div className="calendar">
            <div className="weekRows">
                {renderWeekdayRow()}
                <div className="weekRow">
                    <div className="dayCell">
                        <div className = "dayWrapper">1</div>
                        <div className = "eventWrapper">dadsf</div>
                    </div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                </div>
                <div className="weekRow">
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                </div>
                <div className="weekRow">
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                </div>
                <div className="weekRow">
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                </div>
                <div className="weekRow">
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                </div>
                <div className="weekRow">
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                    <div className="dayCell"></div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;