import React, {ReactElement, useState} from 'react';
import './index.scss';
import Left from '../../resource/images/left.png';
import Right from '../../resource/images/right.png';
import Calendar from './Calendar/Calendar';
import Member from './Member/Member';
import {PopupUtil} from '../../util/PopupUtil';
import EventDetail from './EventDetail';

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

  const addEvent = (): void => {
    PopupUtil.showEventAddPopup();
  }

  const setSelectedDate = (date: number): void => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(date);
  }

  return (
    <div className="home root_page">
      <Member/>
      <section className="section_calendar">
        <section className="function_menu">
          <div className="calendar_submenu">
            <div className="calendar_controller">
              {/*TODO SVG로 바꿔보기*/}
              <button onClick={subtractMonth}><img src={Left} alt="left"/></button>
              <button onClick={addMonth}><img src={Right} alt="right"/></button>
              <button onClick={addEvent} className="add_event">
                일정 추가
              </button>
            </div>
            <div className="date_shower">{year}년 {month + 1}월</div>
          </div>
        </section>
        <section className="main_container">
          <Calendar year={year} month={month} onClickCell={setSelectedDate}/>
        </section>
      </section>
      <EventDetail year={selectedYear} month={selectedMonth} day={selectedDay}/>
    </div>
  );
};
export default Index;
