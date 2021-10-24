import axios from 'axios';
import React, {ReactElement, useEffect } from 'react';
import Unauthorized from '../pages/Unauthorized/Unauthorized';

export namespace HOC {
  // TODO 로그인되었는지 확인하는 HOC 구현하기
  export function fallbackLoginPage(Component: () => ReactElement): () => ReactElement {
    
    let isLoggedIn: boolean;
    axios.get('/api/users/login/check').then((res) => {
      isLoggedIn = res.data.isLoggedIn;
    });
    
    const NewComponent = (): ReactElement => {
      return (
        <>
        {isLoggedIn ? <Component/> : <Unauthorized/>}
        </>
      );
    };

    return NewComponent;
  }

  export function returnSameComponent(Component: () => ReactElement): () => ReactElement {

    const NewComponent = (): ReactElement => {
      return (
        <Component/>
      );
    }

    return NewComponent;
  }
}