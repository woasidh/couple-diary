import React, {ReactElement, useState} from 'react';
import './index.scss';
import Calendar from './Calendar';
import Member from './Member/Member';
import EventDetail from './EventDetail/EventDetail';

const Index = (): ReactElement => {
  // Calendar 보여줄 date
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  // 상세정보용 date
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  function subtractMonth(): void {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  }

  function addMonth(): void {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  }

  const setSelectedDate = (date: number): void => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(date);
  }

  return (
    <div className="home root_page">
      <Member/>
      <Calendar
        year={year}
        month={month}
        onClickNextBtn = {addMonth}
        onClickPrevBtn = {subtractMonth}
        onClickCell={setSelectedDate}/>
      <EventDetail
        year={selectedYear}
        month={selectedMonth}
        day={selectedDay}/>
    </div>
  );
};
export default Index;
