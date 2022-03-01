import {ReactElement, useEffect, useState} from 'react';
import Calendar from './Calendar';
import axios from 'axios';
import {DataParsingUtil} from '../../../shared/util/DataParsingUtil';
import {addCalendarEvent, CalendarEventData, CalendarEventType} from '../../../reducers/CalendarEvent';
import sampleHolidayData from '../../../resource/data/SampleHolidayData';
import {StringUtil} from '../../../shared/util/StringUtil';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {PopupUtil} from '../../../shared/hoc/PopupUtil';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';

interface CalendarContainerProps {
  year: number;
  month: number;
  onClickCell: (date: number) => any;
  onClickPrevBtn: () => any;
  onClickNextBtn: () => any;
}

const calendarConfig = {}

const CalendarContainer = (props: CalendarContainerProps): ReactElement => {
  const dispatch = useDispatch();
  const calendarEventMap = useSelector((state: RootState) => state.calendarEvent.eventMap);
  const [holidayApiCallMap, setHolidayApiCallMap] = useState(new Map<number, boolean>());

  // 개인, 커플 일정 모두 가져오기
  // todo promise all...?
  useEffect((): void => {
    const getPersonalCalendarEvent = (): void => {
      axios.get(process.env.REACT_APP_DB_HOST + '/api/calendar/personal', {withCredentials: true}).then((res) => {
        res.data.events.forEach((event: any) => {
          const date = event.date.split('T')[0];
          const calendarEvent = DataParsingUtil.parseToCalendarEvent(event, CalendarEventType.PERSONAL);
          dispatch(addCalendarEvent(date, calendarEvent));
        })
      })
    }
    const getCoupleCalendarEvent = (): void => {
      axios.get(process.env.REACT_APP_DB_HOST + '/api/calendar/couple', {withCredentials: true}).then((res) => {
        res.data.events.forEach((event: any) => {
          const date = event.date.split('T')[0];
          const calendarEvent = DataParsingUtil.parseToCalendarEvent(event, CalendarEventType.COUPLE);
          dispatch(addCalendarEvent(date, calendarEvent));
        })
      })
    }

    getPersonalCalendarEvent();
    getCoupleCalendarEvent();
  }, []);

  // 공휴일 정보 모두 가져오기
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

    // const parseHolidayAPI = (datas: Array<HolidayApiForm>): Map<string, CalendarEventData> => {
    //   return new Map(datas.map(data => {
    //     const calendarCellEvent: CalendarEventData = {
    //       name: data.dateName,
    //       type: CalendarEventType.HOLIDAY
    //     }
    //     return [data.locdate.toString(), calendarCellEvent];
    //   }));
    // }

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

  const showEventAddPopup = (): void => {
    const updateCalendarEventState = (date: string, event: CalendarEventData): void => {
      dispatch(addCalendarEvent(date, event));
    }
    const addEventApiCall = (date: string, event: CalendarEventData): void => {
      const eventData = {
        title: event.name,
        date: date,
        startTime: event.time ? event.time[0] : null,
        endTime: event.time ? event.time[1] : null,
        memo: event.memo
      }

      axios.post(process.env.REACT_APP_DB_HOST + `/api/calendar/${event.type.toLowerCase()}`, eventData, {withCredentials: true})
      .then((res) => {
        if (!res.data.success) PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err);
        updateCalendarEventState(date, {...event, id: res.data.insertId});
      })
      .catch(e => {
        PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
      })
    }

    PopupUtil.showEventAddPopup(addEventApiCall);
  }

  return (
    <Calendar year={props.year}
              month={props.month}
              onClickCell={props.onClickCell}
              onClickPrevBtn={props.onClickPrevBtn}
              onClickNextBtn={props.onClickNextBtn}
              eventMap={calendarEventMap}
              config={calendarConfig}
              onClickAddEventBtn={showEventAddPopup}/>
  )
}

export default CalendarContainer;