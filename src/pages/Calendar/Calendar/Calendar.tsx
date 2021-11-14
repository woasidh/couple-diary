import React, {ReactElement, useEffect} from 'react';
import DayCell from './DayCell/DayCell';
import axios from 'axios';

interface CalendarProps {
    year: number
    month: number
}

const Calendar = ({ year, month }: CalendarProps): ReactElement => {

  useEffect(() => {
    axios.get(`/api/calendar/holiday?year=${year}&month=${month}`).then(res => {
      console.log(res.data);
    })
  }, [year, month]);


  const startDay = new Date(year, month, 1).getDay();
  const totalDay = new Date(year, month + 1, 0).getDate();

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

  function renderWeekRows(): Array<ReactElement> {
    let dayCount = 1;
    let shouldCount = false;

    return (
      [0, 1, 2, 3, 4, 5].map((row) => (
        <div className="weekRow" key={row}>
          {[0, 1, 2, 3, 4, 5, 6].map((column, idx) => {
            if (dayCount === totalDay + 1) shouldCount = false;
            if (row === 0 && column === startDay) shouldCount = true;
            return <DayCell day={shouldCount ? dayCount++ : null} key={idx} />;
          })}
        </div>
      ))
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
};

export default Calendar;
