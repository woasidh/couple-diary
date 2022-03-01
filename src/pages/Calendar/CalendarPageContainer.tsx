import React, {ReactElement, ReactNode, useEffect, useState} from 'react';
import axios from 'axios';
import {DataParsingUtil} from '../../shared/util/DataParsingUtil';
import {addCalendarEvent, CalendarEventData, CalendarEventType} from '../../reducers/CalendarEvent';
import {dispatch} from 'jest-circus/build/state';
import sampleHolidayData from '../../resource/data/SampleHolidayData';
import {StringUtil} from '../../shared/util/StringUtil';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {PopupUtil} from '../../shared/hoc/PopupUtil';
import {NotificationPopupType} from '../../components/Popup/NotificationPopup';
import Member from './Member/Member';
import Calendar from './Calendar/Calendar';
import EventDetail from './EventDetail/EventDetail';
import {useMediaQuery} from 'react-responsive';
import ReactDOM from 'react-dom';
import PopupBackground from '../../components/Popup';

const CalendarPageContainer = (): ReactElement => {
  const dispatch = useDispatch();

  // Calendar 보여줄 date
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  // 상세정보용 date
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [holidayApiCallMap, setHolidayApiCallMap] = useState(new Map<number, boolean>());
  const [isMobileEventDetailPopupOpen, setIsMobileEventDetailPopupOpen] = useState<boolean>(false);

  const calendarEventMap = useSelector((state: RootState) => state.calendarEvent.eventMap);

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
    const isApiCalled = !!holidayApiCallMap.get(year);
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
        [year, true]
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
  }, [year]);

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
    setIsMobileEventDetailPopupOpen(true);
  }

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

      axios.post(process.env.REACT_APP_DB_HOST+`/api/calendar/${event.type.toLowerCase()}`, eventData, { withCredentials: true })
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

  const calendarConfig = {
  }

  return (
    <div className="CalendarContentsWrapper">
      <Member/>
      <Calendar
        year={year}
        month={month}
        onClickNextBtn={addMonth}
        onClickPrevBtn={subtractMonth}
        onClickCell={setSelectedDate}
        eventMap={calendarEventMap}
        onClickAddEventBtn = {showEventAddPopup}
        config = {calendarConfig}/>
      <MobileModal
        isOpenModal={isMobileEventDetailPopupOpen}
        onClickBackground={(): void => setIsMobileEventDetailPopupOpen(false)}
      >
        <EventDetail
          year={selectedYear}
          month={selectedMonth}
          day={selectedDay}
          openModal={isMobileEventDetailPopupOpen}/>
      </MobileModal>
    </div>
  );
}

interface ModalProps {
  children: ReactNode,
  isOpenModal: boolean,
  onClickBackground: () => void;
}

const MobileModal = (props: ModalProps): any => {
  const isMobile = useMediaQuery({query: '(max-width: 640px)'});

  const renderContent = (): any => {
    if (isMobile) {
      return (
        ReactDOM.createPortal(
          <PopupBackground onBackgroundClick={props.onClickBackground} isActivated={props.isOpenModal}>
            {props.children}
          </PopupBackground>
          , document.querySelector('#mobile_modal') as Element)
      )
    } else return <>{props.children}</>
  }

  return (
    <>
      {renderContent()}
    </>
  )
}