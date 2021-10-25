import {combineReducers} from 'redux';
import counterReducer from './Counter';

/**
 * store에서 쓸 rootReducer
 */
export const rootReducer = combineReducers({
  counter: counterReducer
})

/**
 * Root 상태 타입 정의
 */
export type RootState = ReturnType<typeof rootReducer>