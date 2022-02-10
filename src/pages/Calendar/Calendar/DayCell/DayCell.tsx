import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {CalendarEventData, CalendarEventType} from '../../../../redux_module/CalendarEvent';
import './DayCell.scss';
import {PopupUtil} from '../../../../components/Util/PopupUtil';
import {NotificationPopupType} from '../../../../components/Popup/NotificationPopup';

interface DayCellProps {
  day: number | null;
  event?: Array<CalendarEventData> | null;
  onClick: (date: number) => void;
}

const DayCell = (props: DayCellProps): ReactElement => {

  const numRef = useRef<number>(1);

  const [holidayEvent, setHolidayEvent] = useState<CalendarEventData | null>(null);
  const [scheduleEvents, setScheduleEvents] = useState<Array<CalendarEventData>>([]);

  // todo 다시 바꿔보기
  useEffect(() => {
    if (props.event) {
      setScheduleEvents(props.event.filter(event => {
        if (event.type === CalendarEventType.HOLIDAY) setHolidayEvent(event);
        else return true;
      }))
    } else {
      setHolidayEvent(null);
      setScheduleEvents([]);
    }
  }, [props.event]);

  const renderItems = (): Array<ReactElement> | ReactElement => (
    scheduleEvents.map((event, idx) => (
      <div
        className="event_item"
        key={idx}
        style={{
          backgroundColor: `${CalendarEventColorMap[event.type]}`
        }}>
        {event.name}
      </div>))
  )

  const onClickCell = (): void => {
    if (props.day) {
      props.onClick(props.day);
      // PopupUtil.showMobileEventDetailPopup();
    }
  }

  return (
    <div className="dayCell" onClick={onClickCell}>
      <div className="dayWrapper">
        {holidayEvent ? <span className = 'holidayCellLabel'>{holidayEvent.name}</span> : <span></span>}
        <span>{props.day}</span>
      </div>
      <div className="eventWrapper">
        {props.event && renderItems()}
      </div>
    </div>
  );
};

const CalendarEventColorMap = {
  HOLIDAY: '#FF4343',
  PERSONAL: '#4395FF',
  COUPLE: '#FFAB91'
}

export default DayCell;
