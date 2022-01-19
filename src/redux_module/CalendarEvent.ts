/**
 * Calendar Event
 */

// todo module 개념 정리하기

const ADD_EVENT = 'calendarEvent/ADD_EVENT' as const;

/**
 * action 생성 함수
 */
export const addCalendarEvent = (date: string, eventData: CalendarEventData): any => {
  return {
    type: ADD_EVENT,
    payload: {
      eventDate: date,
      eventData: eventData
    }
  }
}

/**
 * reducer
 */

const CalendarEventReducer = (state: CalendarEventState = {eventMap: new Map<string, Array<CalendarEventData>>()}, action: CalendarEventAction): CalendarEventState => {
  switch(action.type) {
    case ADD_EVENT: {
      const prevEvents = state.eventMap.get(action.payload.eventDate);
      const newEvents = prevEvents ? prevEvents.concat([action.payload.eventData]) : [action.payload.eventData];
      return {
        eventMap: new Map([
          ...state.eventMap,
          [action.payload.eventDate, newEvents]
        ])
      }
    }
    default:
      return state;
  }
}

/**
 * types
 */
type CalendarEventAction = ReturnType<typeof addCalendarEvent>;

type CalendarEventState = {
  eventMap: Map<string, Array<CalendarEventData>>
}

export default CalendarEventReducer;

export enum CalendarEventType {
  PERSONAL= 'PERSONAL',
  COUPLE = 'COUPLE', // todo 네이밍 리팩토링 필요
  HOLIDAY = 'HOLIDAY'
}

export interface CalendarEventData {
  type: CalendarEventType;
  name: string;
  memo?: string;
}