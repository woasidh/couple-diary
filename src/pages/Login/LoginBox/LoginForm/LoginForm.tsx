import React, {ReactElement, useState} from 'react';
import EmailInput, {EmailInputStatus} from './EmailInput/EmailInput';
import PasswordInput, {PasswordStatus} from './PasswordInput/PasswordInput';
import ConditionalButton from './ConditionalButton/ConditionalButton';
import variables from '../../../../variables';
import {LoginSubmitForm} from './LoginFormContainer';

interface LoginFormProps {
  submitContent: LoginSubmitForm;
  emailInputStatus: EmailInputStatus;
  passwordInputStatus: PasswordStatus;
  onSubmit: () => any;
  onEmailInputChange: (email: string, isEmailValid: boolean) => any;
  onPasswordInputChange: (password: string) => any;
}

const LoginForm = (props: LoginFormProps): ReactElement => {

  return (
    <div className="login_form">
      <EmailInput
        inputStatus={props.emailInputStatus}
        type="email"
        label="이메일"
        onChangeContent={props.onEmailInputChange}
        value={props.submitContent.email}/>
      <PasswordInput
        inputStatus={props.passwordInputStatus}
        type="password"
        label="비밀번호"
        onChangeContent={props.onPasswordInputChange}
        value={props.submitContent.password}/>
      <ConditionalButton
        onClick={props.onSubmit}
        isClickable={props.emailInputStatus.isValid}
        onColor={variables.colors.primaryPink}
        offColor={variables.colors.backgroundGray}
        content='로그인'/>
      <div className="login_keep">
        <input type="checkbox" id="keep_login"/>
        <label htmlFor="keep_login" id="custom_checkbox">로그인 상태 유지할래요</label>
      </div>
    </div>
  );
}

export default LoginForm;