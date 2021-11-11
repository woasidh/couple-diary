import React, {ReactElement, useState} from 'react';
import './index.scss';
import Left from '../../resource/images/left.png';
import Right from '../../resource/images/right.png';
import Calendar from './Calendar/Calendar';
import Topbar from '../../components/Topbar/Topbar';

const Index = (): ReactElement => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  function subtractMonth(): void {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
      return;
    }
    setMonth(month - 1);
  }

  function addMonth(): void {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      return;
    }
    setMonth(month + 1);
  }

  return (
    <div className="home root_page">
      <section className = "section_member">
        <div className = 'member_container'>
          <div className = 'member1'>백</div>
          <div className = 'member2'>최</div>
        </div>
      </section>
      <section className = "section_calendar">
        <section className="function_menu">
          <div className="calendar_submenu">
            <div className="calendar_controller">
              <button onClick={subtractMonth}><img src={Left} alt="left"/></button>
              <button onClick={addMonth}><img src={Right} alt="right"/></button>
            </div>
            <div className="date_shower">{year}년 {month + 1}월</div>
          </div>
        </section>
        <section className="main_container">
          <Calendar year={year} month={month}/>
        </section>
      </section>
      <section className = "section_detail">
      </section>
    </div>
  );
};
export default Index;
