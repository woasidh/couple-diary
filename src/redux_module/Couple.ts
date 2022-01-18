/**
 * actions
 */

const COUPLE_STATUS_UPDATE = 'couple/COUPLE_STATUS_UPDATE' as const;
const DROP_COUPLE_DATA = 'couple/DROP_COUPLE_DATA' as const;

/**
 * action 생성 함수
 */

export const updateCoupleStatus = (coupleData: CoupleData): any => {
  return {
    type: COUPLE_STATUS_UPDATE,
    payload: coupleData
  }
};

export const removeCoupleData = (): any => {
  return {
    type: DROP_COUPLE_DATA
  }
};

/**
 * reducer
 */

const coupleReducer  = (state: CoupleState | null = null, action: CoupleAction): CoupleState | null => {
  switch(action.type) {
    case COUPLE_STATUS_UPDATE:
      return {
        ...state,
        isCouple: action.payload.isCouple,
        coupleId: action.payload.coupleId,
        partnerName: action.payload.partnerName,
        partnerEmail: action.payload.partnerEmail
      }
    case DROP_COUPLE_DATA:
      return null;
    default:
      return state;
  }
}

/**
 * type 정의
 */
type CoupleData = {
  isCouple: boolean
  coupleId: string
  partnerName: string
  partnerEmail: string
}

type CoupleState = {
  isCouple: boolean
  coupleId: string
  partnerName: string
  partnerEmail: string
}

type CoupleAction =
| ReturnType<typeof updateCoupleStatus>
| ReturnType<typeof removeCoupleData>;

export default coupleReducer;
