/**
 * Calendar Event
 */

// todo module 개념 정리하기

const ADD_EVENT = 'calendarEvent/ADD_EVENT' as const;

/**
 * action 생성 함수
 */
export const addCalendarEvent = (date: string, eventData: EventData): any => {
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

const CalendarEventReducer = (state: CalendarEventState = {eventMap: new Map()}, action: CalendarEventAction): CalendarEventState => {
  switch(action.type) {
    case ADD_EVENT:
      return {
        eventMap: new Map([
          ...state.eventMap,
          [action.payload.eventDate, action.payload.eventData]
        ])
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
  eventMap: Map<string, EventData>
}

type EventData = {
  name: string
  memo: string
}

export default CalendarEventReducer;