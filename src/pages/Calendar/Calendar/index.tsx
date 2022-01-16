import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import DayCell, {CalendarCellEvent, EventType} from './DayCell/DayCell';
import axios from 'axios';
import {PopupUtil} from '../../../util/PopupUtil';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';
import Left from '../../../resource/images/left.png';
import Right from '../../../resource/images/right.png';

interface CalendarProps {
  year: number
  month: number
  onClickCell: (date: number) => void;
  onClickNextBtn: () => void;
  onClickPrevBtn: () => void;
}

interface HolidayApiForm {
  dateName: string;
  locdate: number;
}

const Calendar = (props: CalendarProps): ReactElement => {
  const startDay = new Date(props.year, props.month, 1).getDay();
  const totalDay = new Date(props.year, props.month + 1, 0).getDate();

  const [holidayMap, setHolidayMap] = useState<Map<string, CalendarCellEvent>>(new Map<string, CalendarCellEvent>());

  useEffect(() => {
    // todo sample data 지우기
    const sampleData = {
      name: '설날',
      type: EventType.HOLIDAY
    }
    const sampleMap = new Map([
      ['20220101', sampleData]
    ]);
    setHolidayMap(new Map([
      ...holidayMap,
      ...sampleMap
    ]))
    // todo 공휴일 api 호출 풀기
    // axios.get(`/api/calendar/holiday?year=${props.year}`)
    // .then(res => {
    //   if (res.data.item) {
    //     setHolidayMap(new Map([
    //       ...holidayMap,
    //       ...parseHolidayAPI(res.data.item)
    //     ]))
    //   }
    // })
    // .catch(e => {
    //   PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
    // })
  }, [props.year]);

  const parseHolidayAPI = (datas: Array<HolidayApiForm>): Map<string, CalendarCellEvent> => {
    return new Map(datas.map(data => {
      const calendarCellEvent: CalendarCellEvent = {
        name: data.dateName,
        type: EventType.HOLIDAY
      }
      return [data.locdate.toString(), calendarCellEvent];
    }));
  }

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
  const renderWeekRows = (): Array<ReactElement> => {

    // DayCell에 넘겨주는 data
    let dayCount = 0;
    // DayCell에 일 표기 데이터 넘겨줄 지
    let isValidCell = false;

    return (
      // 6주
      [0, 1, 2, 3, 4, 5].map((row) => (
        <div className="weekRow" key={row}>
          {/* 7일 */}
          {[0, 1, 2, 3, 4, 5, 6].map((column, idx) => {
            if (dayCount === totalDay) isValidCell = false;
            if (row === 0 && column === startDay) isValidCell = true;
            if (isValidCell) dayCount++;
            return <DayCell
              day={isValidCell ? dayCount : null}
              key={idx}
              event={isValidCell ? holidayMap.get(getDateInStringForm(props.year, props.month + 1, dayCount)) : null}
              onClick={props.onClickCell}
            />;
          })}
        </div>
      ))
    );
  }

  const getDateInStringForm = (year: number, month: number, day: number): string => {
    const monthInStr = `${month < 10 ? 0 : ''}${month}`;
    const dayInStr = `${day < 10 ? 0 : ''}${day}`;
    return year + monthInStr + dayInStr;
  }

  const addEvent = (): void => {
    PopupUtil.showEventAddPopup();
  }

  return (
    <section className="section_calendar">
      <section className="function_menu">
        <div className="calendar_submenu">
          <div className="calendar_controller">
            {/*TODO SVG로 바꿔보기*/}
            <button onClick={props.onClickPrevBtn}><img src={Left} alt="left"/></button>
            <button onClick={props.onClickNextBtn}><img src={Right} alt="right"/></button>
            <button onClick={addEvent} className="add_event">
              일정 추가
            </button>
          </div>
          <div className="date_shower">{props.year}년 {props.month + 1}월</div>
        </div>
      </section>
      <section className="main_container">
        <div className="calendar">
          <div className="weekRows">
            {renderWeekdayRow()}
            {renderWeekRows()}
            {holidayMap.size}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Calendar;
