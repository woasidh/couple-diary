import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import DayCell, {CalendarCellEvent, EventType} from './DayCell/DayCell';
import axios from 'axios';
import {PopupUtil} from '../../../util/PopupUtil';
import {PopupMessageType} from '../../../components/Popup';

interface CalendarProps {
    year: number
    month: number
}

interface HolidayApiForm {
  dateName: string;
  locdate: number;
}

const Calendar = ({ year, month }: CalendarProps): ReactElement => {

  const startDay = new Date(year, month, 1).getDay();
  const totalDay = new Date(year, month + 1, 0).getDate();

  

  const sampleEvent: CalendarCellEvent = {
    name: '한글날',
    type: EventType.NORMAL
  }

  const [eventMap, setEventMap] = useState<Map<number, CalendarCellEvent>>(new Map<number, CalendarCellEvent>());

  useEffect(() => {
    console.log(year, month);
    axios.get(`/api/calendar/holiday?year=${year}&month=${month + 1}`).then(res => {
      console.log(typeof res.data.item);
      if (res.data.item){
        const holidays: Array<CalendarCellEvent> | null = convertToEventObject(res.data.item);
        setEventMap(new Map(eventMap.set(1, sampleEvent)));
      }
    }).catch(e => {
      PopupUtil.showNotificationPopup(PopupMessageType.API_ERROR, e.toString());
    })
  }, [year, month]);

  const convertToEventObject = (data: HolidayApiForm): Array<CalendarCellEvent> | null => {
    return null;
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
    let shouldCount = false;

    return (
      // 6주
      [0, 1, 2, 3, 4, 5].map((row) => (
        <div className="weekRow" key={row}>
          {/* 7일 */}
          {[0, 1, 2, 3, 4, 5, 6].map((column, idx) => {
            if (dayCount === totalDay) shouldCount = false;
            if (row === 0 && column === startDay) shouldCount = true;
            if (shouldCount) dayCount++;
            return <DayCell day={shouldCount ? dayCount : null} key={idx} event = {eventMap.get(dayCount)} />;
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
        {eventMap.size}
      </div>
    </div>
  );
};

export default Calendar;
