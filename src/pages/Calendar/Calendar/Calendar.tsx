import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import DayCell, {CalendarCellEvent, EventType} from './DayCell/DayCell';
import axios from 'axios';
import {PopupUtil} from '../../../util/PopupUtil';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';

interface CalendarProps {
  year: number
  month: number
  onClickCell: (date: number) => void;
}

interface HolidayApiForm {
  dateName: string;
  locdate: number;
}

const Calendar = ({year, month, onClickCell}: CalendarProps): ReactElement => {
  const startDay = new Date(year, month, 1).getDay();
  const totalDay = new Date(year, month + 1, 0).getDate();

  const [holidayMap, setHolidayMap] = useState<Map<string, CalendarCellEvent>>(new Map<string, CalendarCellEvent>());

  useEffect(() => {
    axios.get(`/api/calendar/holiday?year=${year}`)
    .then(res => {
      if (res.data.item) {
        setHolidayMap(new Map([
          ...holidayMap,
          ...parseHolidayAPI(res.data.item)
        ]))
      }
    })
    .catch(e => {
      PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
    })
  }, [year]);

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
            return <DayCell
              day={shouldCount ? dayCount : null}
              key={idx}
              event={holidayMap.get(getDateInStringForm(year, month + 1, dayCount))}
              onClick = {onClickCell}
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

  return (
    <div className="calendar">
      <div className="weekRows">
        {renderWeekdayRow()}
        {renderWeekRows()}
        {holidayMap.size}
      </div>
    </div>
  );
};

export default Calendar;
