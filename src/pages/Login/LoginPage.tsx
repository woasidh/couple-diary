import React, {ReactElement} from 'react';
import './index.scss';
import LoginBox from './LoginBox/LoginBox';

const LoginPage = (): ReactElement => {
  return (
    <div className="login_page">
      <LoginBox/>
    </div>
  );
};

export default LoginPage;
