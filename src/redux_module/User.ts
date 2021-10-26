import axios from 'axios';

/**
 * actions
 */

const SUCCESSLOGIN = 'user/SUCCESSLOGIN' as const;
const FAILLOGIN = 'user/FAILLOGIN' as const;

/**
 * action 생성 함수
 */

const successLogin = (email: string): any => {
  return {
    type: SUCCESSLOGIN,
    payload: email
  }
};

const failLogin = (): any => {
  return {
    type: FAILLOGIN
  }
}

export const requestLogin = (): any => (dispatch: any): any => {
  axios.get('/api/users/login/chec11k').then(res => {
    dispatch(successLogin(res.data.email));
  })
    .catch(e => {
      dispatch(failLogin());
    });
}

/**
 * reducer
 */

const userReducer  = (state: UserState = initialState, action: UserAction): UserAction => {
  switch(action.type) {
    case SUCCESSLOGIN:
      return {
        ...state,
        email: action.payload
      }
    case FAILLOGIN:
      return {
        ...state,
        status: false
      }
    default:
      console.log(action);
      return state;
  }
}

/**
 * type 정의
 */
type UserState = {
  email: string
  status: boolean
}

const initialState: UserState = {
  email: '',
  status: true
}

type UserAction =
  | ReturnType<typeof successLogin>
  | ReturnType<typeof failLogin>;

export default userReducer;
