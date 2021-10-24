import {combineReducers} from 'redux';

interface CounterState {
  value: number;
}

export const increaseCount = (): any => ({type: 'INCREASE'});

const counterReducer = (state: CounterState= {value: 0}, action: any): any => {
  switch(action.type) {
    case 'INCREASE':
      return {
        ...state,
        value: state.value + 1
      }
    case 'DECREASE':
      return {
        ...state,
        value: state.value - 1
      }
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer
})
