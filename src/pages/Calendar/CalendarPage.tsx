import React, {ReactElement, ReactNode, useState} from 'react';
import './CalendarPage.scss';
import Member from './Member/Member';
import EventDetail from './EventDetail/EventDetail';
import ReactDOM from 'react-dom';
import PopupBackground from '../../components/Popup';
import {useMediaQuery} from 'react-responsive';
import CalendarContainer from './Calendar/CalendarContainer';
import EventDetailContainer from './EventDetail/EventDetailContainer';

const Index = (): ReactElement => {

  // Calendar 보여줄 date
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  // 상세정보용 date
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [isMobileEventDetailPopupOpen, setIsMobileEventDetailPopupOpen] = useState<boolean>(false);

  const subtractMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  }

  const addMonth = (): void => {
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
      <CalendarContainer
        year={year}
        month={month}
        onClickCell={setSelectedDate}
        onClickPrevBtn={subtractMonth}
        onClickNextBtn={addMonth}/>
      <MobileModal
        isOpenModal={isMobileEventDetailPopupOpen}
        onClickBackground={(): void => setIsMobileEventDetailPopupOpen(false)}
      >
        <EventDetailContainer
          year={selectedYear}
          month={selectedMonth}
          day={selectedDay}
          openModal={isMobileEventDetailPopupOpen}/>
      </MobileModal>
    </div>
  );
};

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
export default Index;
