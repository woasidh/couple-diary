import React, {ReactElement} from 'react';
import LoginFooter from './LoginFooter/LoginFooter';
import LoginFormContainer from './LoginForm/LoginFormContainer';

const LoginBox = (): ReactElement => {
  return (
    <div className="login_box">
      <div className="login_content_wrapper">
        <div className="logo_header">로그인</div>
        <LoginFormContainer/>
        <LoginFooter/>
      </div>
    </div>
  );
}

export default LoginBox;