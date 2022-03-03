import React, {ReactElement} from 'react';
import LoginFooter from './LoginFooter/LoginFooter';
import LoginFormContainer from './LoginForm/LoginFormContainer';
import FormBox from '../FormBox/ForBox';

const LoginBox = (): ReactElement => {
  return (
    <FormBox title='로그인'>
      <LoginFormContainer/>
      <LoginFooter/>
    </FormBox>
  );
}

export default LoginBox;