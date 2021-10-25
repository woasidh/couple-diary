/**
 * 액션 타입 선언
 *
 */
const INCREASE = 'counter/INCREASE' as const;

/**
 * 액션 객체 만드는 함수
 * returnType은 any -> action type은 action 생성 함수 반환값으로 만들기 때문
 */
export const increaseCounter = (): any => ({
  type: INCREASE
});

const counterReducer = (state: CounterState = initialState, action: CounterAction): CounterState => {
  switch(action.type) {
    case INCREASE:
      return {
        ...state,
        count: state.count + 1
      }
    // case ASYNCINCREASE:
    //   return {
    //   }
    default:
      return state;
  }
}

// 초기 상태
const initialState: CounterState = {
  count: 0
}

/**
 * 타입 정리
 * 상태 타입
 * 액션 타입
 */

type CounterState = {
  count: number
}

type CounterAction = ReturnType<typeof increaseCounter>;
export default counterReducer
