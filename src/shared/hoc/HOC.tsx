import axios from 'axios';
import React, {ReactElement, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {NotificationPopupType} from '../../components/Popup/NotificationPopup';
import Login from '../../pages/Login/LoginPage';
import {loginSuccess, logoutSuccess} from '../../reducers/User';
import {PopupUtil} from './PopupUtil';
import {removeCoupleData, updateCoupleStatus} from '../../reducers/Couple';

export enum AuthOption {
  AUTH_ONLY,
  NO_AUTH_ONLY,
  SOLO_ONLY
}

export namespace HOC {
  // TODO 로그인되었는지 확인하는 hoc 구현하기
  export function checkAuth(
    Component: () => ReactElement,
    option: AuthOption): () => ReactElement {

    return (): ReactElement => {
      // history.push 되고 나서 unmount된 컴포넌트 state 조절 못하니까 clean up
      useEffect(() => {
        return ((): void => {
          setIsLoading(false);
        })
      }, []);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [isApiError, setIsApiError] = useState<boolean>(false);

      const history = useHistory();
      const dispatch = useDispatch();

      useEffect(() => {
        // todo axios 모듈로 만들기
        // todo Auth HOC 정리 필요...(너무 더러움)
        axios.get(process.env.REACT_APP_DB_HOST+'/api/users/login/check', { withCredentials: true }).then((res) => {
          if (!res.data.isLoggedIn) { // 로그인유저만 출입가능 - 로그인 안되어있을 떄 -> 로그인으로
            dispatch(logoutSuccess());
            dispatch(removeCoupleData());
            if (option === AuthOption.AUTH_ONLY) {
              history.push('/');
            }
          } else if (res.data.isLoggedIn) { // 로그인안된 유저만 출입가능 - 로그인 되어있을 때 -> workspace로 (현재는 loginPage만 적용)
            console.log(res.data, option);
            dispatch(loginSuccess(res.data.userData));
            dispatch(updateCoupleStatus(res.data.coupleData));
            if (option === AuthOption.NO_AUTH_ONLY) {
              history.push('/workspace');
            }
            if (!!res.data.coupleData && option === AuthOption.SOLO_ONLY) {
              history.push('/');
            }
          }
          // 나머지는 그대로
          setIsLoading(false);
        }).catch(e => {
          PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
          setIsApiError(true);
        });
      }, []);

      return (
        <>
          {!isLoading && <Component/>}
          {isApiError && <Login/>}
        </>
      );
    };
  }
}