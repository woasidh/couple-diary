import React, {ReactElement, useState} from 'react';
import EmailInput, {EmailInputStatus} from './EmailInput/EmailInput';
import PasswordInput, {PasswordStatus} from './PasswordInput/PasswordInput';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {PopupUtil} from '../../../../shared/hoc/PopupUtil';
import {NotificationPopupType} from '../../../../components/Popup/NotificationPopup';
import ConditionalButton from './ConditionalButton/ConditionalButton';
import variables from '../../../../variables';

interface LoginSubmitForm {
  email: string
  password: string
}

interface LoginFormProps {
  onLoginSuccess: (apiData: any) => any;
}

const LoginForm = (props: LoginFormProps): ReactElement => {
  const history = useHistory();

  const [submitContent, setSubmitContent] = useState<LoginSubmitForm>({email: '', password: ''});
  const [emailInputStatus, setEmailInputStatus] = useState<EmailInputStatus>({isValid: false, inputStateMsg: ''});
  const [passwordInputStatus, setPasswordInputStatus] = useState<PasswordStatus>(PasswordStatus.UNKNOWN);

  function onEmailInputChange(email: string, isEmailValid: boolean): void {
    setSubmitContent({...submitContent, email});
    setEmailInputStatus({
      isValid: isEmailValid,
      inputStateMsg: isEmailValid ? '유효한 이메일입니다' : '@를 포함한 이메일 형식으로 입력해주세요',
    });
  }

  function onPasswordInputChange(password: string): void {
    setSubmitContent({...submitContent, password});
    setPasswordInputStatus(PasswordStatus.UNKNOWN);
  }

  function submitLoginForm(): void {
    axios.post(process.env.REACT_APP_DB_HOST + '/api/users/login', submitContent, {withCredentials: true}).then((res) => {
      if (res.status !== 200) { // 서버 통신 잘 안되었을 때
        alert('api connection error');
      } else { // 서버 통신 잘되었을 때
        const {data} = res;
        if (!data.success) {
          if (data.errMsg === 'PASSWORD_MISMATCH') { // 비밀번호 불일치일 떄
            setPasswordInputStatus(PasswordStatus.WRONG);
          } else if (data.errMsg === 'NO_MATCH_ID') { // ID가 없을 때
            setEmailInputStatus({
              isValid: false,
              inputStateMsg: 'id가 존재하지 않습니다',
            });
          }
        } else {
          // 로그인 성공
          // redux state 변경
          props.onLoginSuccess(res.data);
          history.push('/workspace');
        }
      }
    }).catch((e) => {
      PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
    });
  }

  return (
    <div className="login_form">
      <EmailInput inputStatus={emailInputStatus} type="email" text="이메일" onChangeContent={onEmailInputChange}/>
      <PasswordInput inputStatus={passwordInputStatus} type="password" text="비밀번호" onChangeContent={onPasswordInputChange}/>
      <ConditionalButton
        onClick={submitLoginForm}
        isClickable={emailInputStatus.isValid}
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