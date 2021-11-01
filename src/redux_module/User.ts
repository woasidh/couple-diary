/**
 * actions
 */

const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS' as const;

/**
 * action 생성 함수
 */

export const loginSuccess = (userData: UserData): any => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData
  }
};

export const logoutSuccess = (): any => {
  return {
    type: LOGOUT_SUCCESS
  }
}

/**
 * reducer
 */

const userReducer  = (state: UserState | null = null, action: UserAction): UserAction => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload.name
      }
    case LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}

/**
 * type 정의
 */
type UserData = {
  name: string
}

type UserState = {
  name: string
}

type UserAction =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logoutSuccess>;

export default userReducer;
