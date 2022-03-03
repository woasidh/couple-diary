import React, {ReactElement} from 'react';
import './index.scss';
import LoginBox from './LoginBox/LoginBox';
import ImgBackground from './ImgBackground/ImgBackground';

const LoginPage = (): ReactElement => {
  return (
      <div className = 'login_page'>
        <ImgBackground/>
        <LoginBox/>
      </div>
  );
};

export default LoginPage;
