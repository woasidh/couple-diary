import React, {ReactElement, ReactNode, useEffect, useState} from 'react';
import './index.scss';
import Calendar from './Calendar/Calendar';
import Member from './Member/Member';
import EventDetail from './EventDetail/EventDetail';
import axios from 'axios';
import {DataParsingUtil} from '../../util/DataParsingUtil';
import {addCalendarEvent, CalendarEventType} from '../../redux_module/CalendarEvent';
import {useDispatch} from 'react-redux';
import ReactDOM from 'react-dom';
import PopupBackground from '../../components/Popup';
import {useMediaQuery} from 'react-responsive';

const Index = (): ReactElement => {
  const dispatch = useDispatch();

  // Calendar 보여줄 date
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  // 상세정보용 date
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const [isMobileEventDetailPopupOpen, setIsMobileEventDetailPopupOpen] = useState<boolean>(false);

  useEffect((): void => {
    axios.get('/api/calendar/personal').then((res) => {
      res.data.events.forEach((event: any) => {
        const date = event.date.split('T')[0];
        const calendarEvent = DataParsingUtil.parseToCalendarEvent(event, CalendarEventType.PERSONAL);
        dispatch(addCalendarEvent(date, calendarEvent));
      })
    })

    axios.get('/api/calendar/couple').then((res) => {
      res.data.events.forEach((event: any) => {
        const date = event.date.split('T')[0];
        const calendarEvent = DataParsingUtil.parseToCalendarEvent(event, CalendarEventType.COUPLE);
        dispatch(addCalendarEvent(date, calendarEvent));
      })
    })
  }, []);

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

  return (
    <div className="CalendarContentsWrapper">
      <Member/>
      <Calendar
        year={year}
        month={month}
        onClickNextBtn={addMonth}
        onClickPrevBtn={subtractMonth}
        onClickCell={setSelectedDate}/>
      <Modal
        isOpenModal={isMobileEventDetailPopupOpen}
        onClickBackground={(): void => setIsMobileEventDetailPopupOpen(false)}
      >
        <EventDetail
          year={selectedYear}
          month={selectedMonth}
          day={selectedDay}
          openModal={isMobileEventDetailPopupOpen}/>
      </Modal>
    </div>
  );
};

interface ModalProps {
  children: ReactNode,
  isOpenModal: boolean,
  onClickBackground: () => void;
}

const Modal = (props: ModalProps): any => {
  const isMobile = useMediaQuery({query: '(max-width: 640px)'});

  const renderContent = (): any => {
    if (isMobile) {
      return (
        ReactDOM.createPortal(
          <PopupBackground onBackgroundClick={props.onClickBackground} isActivated={props.isOpenModal}>
            {props.children}
          </PopupBackground>
          , document.querySelector('#popup') as Element)
      )
    } else return <>{props.children}</>
  }

  return (
    <>
      {renderContent()}
    </>
  )
}
export default Index;
