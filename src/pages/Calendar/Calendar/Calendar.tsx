import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import DayCell from './DayCell/DayCell';
import {PopupUtil} from '../../../components/Util/PopupUtil';
import Left from '../../../resource/images/left.png';
import Right from '../../../resource/images/right.png';
import sampleHolidayData from '../../../resource/data/SampleHolidayData';
import {useDispatch, useSelector} from 'react-redux';
import {addCalendarEvent, CalendarEventData, CalendarEventType} from '../../../redux_module/CalendarEvent';
import {RootState} from '../../../redux_module';
import {StringUtil} from '../../../util/StringUtil';
import axios from 'axios';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';
import './Calendar.scss';

interface CalendarProps {
  year: number
  month: number
  onClickCell: (date: number) => void;
  onClickNextBtn: () => void;
  onClickPrevBtn: () => void;
}

const Calendar = (props: CalendarProps): ReactElement => {
  const dispatch = useDispatch();

  const calendarEventMap = useSelector((state: RootState) => state.calendarEvent.eventMap);

  const startDay = new Date(props.year, props.month, 1).getDay();
  const totalDay = new Date(props.year, props.month + 1, 0).getDate();

  const [holidayApiCallMap, setHolidayApiCallMap] = useState(new Map<number, boolean>());

  useEffect(() => {
    const isApiCalled = !!holidayApiCallMap.get(props.year);
    if (!isApiCalled) {
      // todo sample data -> api 호출로 변경하기
      sampleHolidayData.forEach((data) => {
        const calendarEvent: CalendarEventData = {
          type: CalendarEventType.HOLIDAY,
          name: data.dateName,
          time: null,
          memo: null
        }
        dispatch(addCalendarEvent(StringUtil.convertToDate(data.locdate.toString()), calendarEvent));
      });
      setHolidayApiCallMap(new Map([
        ...holidayApiCallMap,
        [props.year, true]
      ]))
    }

    // todo 주석 풀고 api 호출하기
    // axios.get(`/api/calendar/holiday?year=${props.year}`)
    // .then(res => {
    //   console.log(res.data.item);
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

  // const parseHolidayAPI = (datas: Array<HolidayApiForm>): Map<string, CalendarEventData> => {
  //   return new Map(datas.map(data => {
  //     const calendarCellEvent: CalendarEventData = {
  //       name: data.dateName,
  //       type: CalendarEventType.HOLIDAY
  //     }
  //     return [data.locdate.toString(), calendarCellEvent];
  //   }));
  // }

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
              event={isValidCell ? calendarEventMap.get(StringUtil.dateToString(props.year, props.month + 1, dayCount)) : null}
              onClick={props.onClickCell}
            />;
          })}
        </div>
      ))
    );
  }

  const showEventAddPopup = (): void => {

    const updateCalendarEventState = (date: string, event: CalendarEventData): void => {
      dispatch(addCalendarEvent(date, event));
    }

    PopupUtil.showEventAddPopup((date: string, event: CalendarEventData): void => {
      // api call
      axios.post(`/api/calendar/${event.type.toLowerCase()}`, {
        title: event.name,
        date: date,
        startTime: event.time ? event.time[0] : null,
        endTime: event.time ? event.time[1] : null,
        memo: event.memo
      })
      .then((res) => {
        // api success -> redux state update
        if (!res.data.success) {
          PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err);
        }
        updateCalendarEventState(date, {...event, num: res.data.insertId});
      }).catch(e => {
        PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
      })
    });
  }

  return (
    <section className="section_calendar">
      <section className="function_menu">
        <div className="calendar_submenu">
          <div className="calendar_controller">
            {/*TODO SVG로 바꿔보기*/}
            <button onClick={props.onClickPrevBtn}><img src={Left} alt="left"/></button>
            <button onClick={props.onClickNextBtn}><img src={Right} alt="right"/></button>
            <button onClick={showEventAddPopup} className="add_event">
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
