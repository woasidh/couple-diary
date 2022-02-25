import React, {ReactElement, useState} from 'react';
import LoginForm from './LoginForm/LoginForm';
import LoginFooter from './LoginFooter/LoginFooter';

const LoginBox = (): ReactElement => {
  return (
    <div className="login_box">
      <div className="login_content_wrapper">
        <div className="logo_header">로그인</div>
        <LoginForm/>
        <LoginFooter/>
      </div>
    </div>
  );
}

export default LoginBox;