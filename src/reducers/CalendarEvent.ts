/**
 * Calendar Event
 */

// todo redux 개념 정리하기
// todo module 개념 정리하기

const ADD_EVENT = 'calendarEvent/ADD_EVENT' as const;
const CHANGE_EVENT = 'calendarEvent/CHANGE_EVENT' as const;
const DELETE_EVENT = 'calendarEvent/DELETE_EVENT' as const;

/**
 * action 생성함수
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

export const changeCalendarEvent = (prevDate: string, newDate: string, eventData: CalendarEventData): any => {
  return {
    type: CHANGE_EVENT,
    payload: {
      prevDate,
      newDate,
      eventData
    }
  }
}

export const deleteCalendarEvent = (id: number, eventType: CalendarEventType, date: string): any => {
  return {
    type: DELETE_EVENT,
    payload: {
      id,
      eventType,
      date
    }
  }
}

/**
 * reducers
 */

const CalendarEventReducer = (state: CalendarEventState = {eventMap: new Map<string, Array<CalendarEventData>>()}, action: CalendarEventAction): CalendarEventState => {
  switch (action.type) {
    case ADD_EVENT: {
      const prevEvents = state.eventMap.get(action.payload.eventDate);
      console.log()
      const newEvents = prevEvents ? prevEvents.concat([action.payload.eventData]) : [action.payload.eventData];
      return {
        ...state,
        eventMap: new Map([
          ...state.eventMap,
          [action.payload.eventDate, newEvents]
        ])
      }
    }
    case CHANGE_EVENT: {
      if (action.payload.prevDate === action.payload.newDate) {
        let prevDateEvents = state.eventMap.get(action.payload.prevDate);
        prevDateEvents = prevDateEvents?.map((event) => {
          if (event.num !== action.payload.eventData.num) return event;
          else return action.payload.eventData;
        })
        return {
          ...state,
          eventMap: new Map([
            ...state.eventMap,
            [action.payload.prevDate as string, prevDateEvents as Array<CalendarEventData>]
          ])
        }
      } else {
        let prevDateEvents = state.eventMap.get(action.payload.prevDate);
        prevDateEvents = prevDateEvents?.filter((event) => (
          event.num !== action.payload.eventData.num
        ));
        let newDateEvents = state.eventMap.get(action.payload.newDate) || [];
        newDateEvents = newDateEvents?.concat([action.payload.eventData]);
        return {
          ...state,
          eventMap: new Map([
            ...state.eventMap,
            [action.payload.prevDate as string, prevDateEvents as Array<CalendarEventData>],
            [action.payload.newDate as string, newDateEvents as Array<CalendarEventData>],
          ])
        }
      }
    }
    case DELETE_EVENT: {
      const prevEvents = state.eventMap.get(action.payload.date);
      const newEvents = prevEvents?.filter((event) =>
        !(event.num === action.payload.id && event.type === action.payload.eventType));
      return {
        ...state,
        eventMap: new Map([
          ...state.eventMap,
          [action.payload.date as string, newEvents as Array<CalendarEventData>]
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
// todo typescript도 개념한번 보기...
type CalendarEventAction =
  | ReturnType<typeof addCalendarEvent>
  | ReturnType<typeof changeCalendarEvent>;

type CalendarEventState = {
  eventMap: Map<string, Array<CalendarEventData>>
}

export default CalendarEventReducer;

export enum CalendarEventType {
  PERSONAL = 'PERSONAL',
  COUPLE = 'COUPLE', // todo 네이밍 리팩토링 필요
  HOLIDAY = 'HOLIDAY'
}

export interface CalendarEventData {
  num?: number
  type: CalendarEventType;
  name: string;
  time: Array<string> | null; // 공휴일이면 null
  memo: string | null; // memo는 optional
}