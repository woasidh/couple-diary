import axios from 'axios';
import React, {ReactElement, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {PopupMessageType} from '../components/Popup';
import Login from '../pages/Login';
import {loginSuccess, logoutSuccess} from '../redux_module/User';
import {PopupUtil} from './PopupUtil';

export enum AuthOption {
  AUTH_ONLY,
  NO_AUTH_ONLY
}

export namespace HOC {
  // TODO 로그인되었는지 확인하는 HOC 구현하기
  export function checkAuth(
    Component: () => ReactElement,
    option: AuthOption): () => ReactElement {

    console.log(Component.name);

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
        console.log('hi');
        axios.get('/api/users/login/check').then((res) => {
          console.log(res.data);
          if (!res.data.isLoggedIn) { // 로그인유저만 출입가능 - 로그인 안되어있을 떄 -> 로그인으로
            dispatch(logoutSuccess());
            if (option === AuthOption.AUTH_ONLY) {
              history.push('/');
            }
          } else if (res.data.isLoggedIn) { // 로그인안된 유저만 출입가능 - 로그인 되어있을 때 -> workspace로 (현재는 loginPage만 적용)
            dispatch(loginSuccess(res.data.userData));
            if (option === AuthOption.NO_AUTH_ONLY) {
              history.push('/workspace');
            }
          }
          // 나머지는 그대로
          setIsLoading(false);
        }).catch(e => {
          PopupUtil.showNotificationPopup(PopupMessageType.API_ERROR, e.toString());
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