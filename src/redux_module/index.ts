import {combineReducers} from 'redux';
import counterReducer from './Counter';
import userReducer from './User';

/**
 * store에서 쓸 rootReducer
 */
export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer
})

/**
 * Root 상태 타입 정의
 */
export type RootState = ReturnType<typeof rootReducer>