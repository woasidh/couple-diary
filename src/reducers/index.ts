import {combineReducers} from 'redux';
import userReducer from './User';
import coupleReducer from './Couple';
import CalendarEventReducer from './CalendarEvent';

/**
 * store에서 쓸 rootReducer
 */
export const rootReducer = combineReducers({
  user: userReducer,
  couple: coupleReducer,
  calendarEvent: CalendarEventReducer
})

/**
 * Root 상태 타입 정의
 */
export type RootState = ReturnType<typeof rootReducer>