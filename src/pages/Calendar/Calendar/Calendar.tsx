import React, {ReactElement, useCallback} from 'react';
import DayCell from './DayCell/DayCell';
import Left from '../../../resource/images/left.png';
import Right from '../../../resource/images/right.png';
import {CalendarEventData} from '../../../reducers/CalendarEvent';
import {StringUtil} from '../../../shared/util/StringUtil';
import './Calendar.scss';

interface CalendarProps {
  year: number
  month: number
  onClickCell: (date: number) => void;
  onClickNextBtn?: () => any;
  onClickPrevBtn: () => any;
  onClickAddEventBtn?: () => any;
  eventMap?: Map<string, Array<CalendarEventData>>
}

const Calendar = (props: CalendarProps): ReactElement => {
  const startDay = new Date(props.year, props.month, 1).getDay();
  const totalDay = new Date(props.year, props.month + 1, 0).getDate();

  //todo useCallback 왜 안되는지???
  const renderWeekdayRow = useCallback((): ReactElement => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <div className="weekdayRow">
        {weekdays.map((weekday, index) => (
          <div className="weekDayCell" key={index}>{weekday}</div>
        ))}
      </div>
    );
  }, []);

  // TODO 하나 DayCell만 update하게 최적화 하기
  // TODO cell render 로직 최적화 하기
  const renderWeekRows = (): Array<ReactElement> => {
    // DayCell에 넘겨주는 data
    let dayCount = 0;
    // DayCell에 일 표기 데이터 넘겨줄 지
    let isValidCell = false;
    return (
      // 6주
      [0, 1, 2, 3, 4, 5].map((row) => (
        <div className="weekRow" key={row}>
          {[0, 1, 2, 3, 4, 5, 6].map((column, idx) => {
            if (dayCount === totalDay) isValidCell = false;
            if (row === 0 && column === startDay) isValidCell = true;
            if (isValidCell) dayCount++;
            return <DayCell
              day={isValidCell ? dayCount : null}
              key={idx}
              event={isValidCell ? props.eventMap?.get(StringUtil.dateToString(props.year, props.month + 1, dayCount)) : null}
              onClick={props.onClickCell}
            />;
          })}
        </div>
      ))
    );
  }

  return (
    <section className="section_calendar">
      <section className="function_menu">
        <div className="calendar_submenu">
          <div className="calendar_controller">
            {/*TODO SVG로 바꿔보기*/}
            <button onClick={props.onClickPrevBtn}><img src={Left} alt="left"/></button>
            <button onClick={props.onClickNextBtn}><img src={Right} alt="right"/></button>
            <button onClick={props.onClickAddEventBtn} className="add_event">
              일정 추가
            </button>
          </div>
          <div className="date_shower">{props.year}년 {props.month + 1}월</div>
        </div>
      </section>
      <section className="main_container">
        <div className="calendar">
          {renderWeekdayRow()}
          {renderWeekRows()}
        </div>
      </section>
    </section>
  );
};

export default Calendar;
