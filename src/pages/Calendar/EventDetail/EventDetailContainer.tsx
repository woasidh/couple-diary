import React, {ReactElement} from 'react';
import {
  CalendarEventData,
  CalendarEventType,
  changeCalendarEvent,
  deleteCalendarEvent
} from '../../../reducers/CalendarEvent';
import axios from 'axios';
import {PopupUtil} from '../../../shared/hoc/PopupUtil';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';
import {useDispatch, useSelector} from 'react-redux';
import {StringUtil} from '../../../shared/util/StringUtil';
import EventDetail from './EventDetail';
import {RootState} from '../../../reducers';

interface EventDetailContainerProps {
  year: number;
  month: number;
  day: number;
  openModal: boolean;
}

const EventDetailContainer = (props: EventDetailContainerProps): ReactElement => {
  const date = StringUtil.dateToString(props.year, props.month + 1, props.day);
  const calendarEventMap = useSelector((state: RootState) => state.calendarEvent.eventMap);

  const dispatch = useDispatch();

  // 이벤트 수정 api call하는 메소드
  const callPatchEventApi = (newDate: string, newEvent: CalendarEventData): void => {
    const data = {
      id: newEvent.id,
      title: newEvent.name,
      date: newDate,
      startTime: newEvent.time ? newEvent.time[0] : null,
      endTime: newEvent.time ? newEvent.time[1] : null,
      memo: newEvent.memo
    }
    axios.patch(process.env.REACT_APP_DB_HOST + `/api/calendar/${newEvent.type.toLowerCase()}`, data, {withCredentials: true})
    .then((res) => {
      if (!res.data.success) PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err);
      dispatch(changeCalendarEvent(date, newDate, {...newEvent, id: newEvent.id}));
    })
    .catch(e => PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString()));
  }

  // 이벤트 삭제 api call하는 메소드
  const callDeleteEventApi = (id: number, eventType: CalendarEventType): void => {
    axios.delete(process.env.REACT_APP_DB_HOST + `/api/calendar/${eventType.toLowerCase()}/?id=${id}`, {withCredentials: true})
    .then(res => {
      if (!res.data.success) PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err);
      dispatch(deleteCalendarEvent(id, eventType, date));
    })
    .catch(e => PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString()))
  }
  const showEditableEventPopup = (prevEvent: CalendarEventData, id: number | undefined): void => {
    if (!id) return;
    PopupUtil.showEventAddPopup(callPatchEventApi, prevEvent, date, callDeleteEventApi);
  }

  return (
    <EventDetail
      year={props.year}
      month={props.month}
      day={props.day}
      openModal={props.openModal}
      onClickEventDetail={showEditableEventPopup}
      events={calendarEventMap.get(date)}/>
  )
}

export default EventDetailContainer;