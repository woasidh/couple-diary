/**
 * actions
 */

const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS' as const;
const COUPLE_STATUS_UPDATE = 'user/COUPLE_STATUS_UPDATE' as const;

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

export const updateCoupleStatus = (): any => {
  return {
    type: COUPLE_STATUS_UPDATE
  }
}

/**
 * reducer
 */

const userReducer  = (state: UserState | null = null, action: UserAction): UserAction => {
  console.log(action);
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        isCouple: action.payload.isCouple
      }
    case LOGOUT_SUCCESS:
      return null;
    case COUPLE_STATUS_UPDATE:
      return {
        ...state,
        isCouple: true
      }
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
  isCouple: boolean
}

type UserAction =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof updateCoupleStatus>;

export default userReducer;
