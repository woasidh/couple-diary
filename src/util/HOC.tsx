import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export enum AuthOption {
  AUTH_ONLY,
  NO_AUTH_ONLY
}

export namespace HOC {
  // TODO 로그인되었는지 확인하는 HOC 구현하기
  export function checkAuth(
    Component: () => ReactElement,
    option: AuthOption): () => ReactElement {

    const NewComponent = (): ReactElement => {

      const [isLoading, setIsLoading] = useState<boolean>(true);

      const history = useHistory();

      useEffect(() => {
        axios.get('/api/users/login/check').then((res) => {
          // 로그인유저만 출입가능 - 로그인 안되어있을 떄 -> 로그인으로
          if (!res.data.isLoggedIn && option === AuthOption.AUTH_ONLY) history.push('/');
          // 로그인안된 유저만 출입가능 - 로그인 되어있을 때 -> workspace로 (현재는 loginPage만 적용)
          else if (res.data.isLoggedIn && option === AuthOption.NO_AUTH_ONLY) history.push('/workspace');
          // 나머지는 그대로
          setIsLoading(false);
        });
      }, []);

      return (
        <>
        {!isLoading && <Component />}
        </>
      );
    };

    return NewComponent;
  }
}