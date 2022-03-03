import './SignupBox.scss';
import React, {ReactElement, useState} from 'react';
import ForBox from '../../Login/FormBox/ForBox';
import EmailInput, {EmailInputStatus} from '../../Login/LoginBox/LoginForm/EmailInput/EmailInput';
import PasswordInput, {PasswordStatus} from '../../Login/LoginBox/LoginForm/PasswordInput/PasswordInput';
import NameInput from './NameInput/NameInput';
import ConditionalButton from '../../Login/LoginBox/LoginForm/ConditionalButton/ConditionalButton';
import axios from 'axios';
import {PopupUtil} from '../../../shared/hoc/PopupUtil';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';
import {useHistory} from 'react-router-dom';

interface SignupFormContent {
  name: string;
  email: string;
  password: string;
}

const initialFormContent = {
  name: '',
  email: '',
  password: ''
}

const SignupBox = (): ReactElement => {

  const history = useHistory();

  const [submitContent, setSubmitContent] = useState<SignupFormContent>(initialFormContent);
  const [emailInputStatus, setEmailInputStatus] = useState<EmailInputStatus>({isValid: false, inputStateMsg: ''});
  const [passwordInputStatus, setPasswordInputStatus] = useState<PasswordStatus>(PasswordStatus.UNKNOWN);

  const updateNameStatus = (name: string): void => {
    setSubmitContent({...submitContent, name});
  }

  const updateEmailStatus = (email: string, isEmailValid: boolean): void => {
    setSubmitContent({...submitContent, email});
    setEmailInputStatus({
      isValid: isEmailValid,
      inputStateMsg: isEmailValid ? '유효한 이메일입니다' : '@를 포함한 이메일 형식으로 입력해주세요',
    });
  }

  const updatePasswordStatus = (password: string): void => {
    setSubmitContent({...submitContent, password});
    setPasswordInputStatus(PasswordStatus.UNKNOWN);
  }
  
  const isValidForm = (): boolean => {
    const {name, password}  = submitContent;
    return !!name && emailInputStatus.isValid && !!password;
  }

  const fetchSignup = (): void => {
    axios.post(process.env.REACT_APP_DB_HOST + '/api/users/signup', submitContent)
      .then(res => {
        console.log(res.data);
        if (!res.data.success) {
          if (res.data.err.code === 'ER_DUP_ENTRY') {
            setEmailInputStatus({
              isValid: false,
              inputStateMsg: '중복되는 이메일입니다. 다시 입력해주세요'
            })
            return;
          }
          PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err.toString());
        } else {
          PopupUtil.showNotificationPopup(NotificationPopupType.NOTIFICATION, '회원가입이 완료되었습니다');
          history.push('/');
        }
      });
  }

  return (
    <ForBox title='회원가입'>
      <div className='signup_form'>
        <NameInput
          onChangeContent={updateNameStatus}
          value={submitContent.name}/>
        <EmailInput
          inputStatus={emailInputStatus}
          onChangeContent={updateEmailStatus}
          value={submitContent.email}/>
        <PasswordInput
          inputStatus={passwordInputStatus}
          onChangeContent={updatePasswordStatus}
          value={submitContent.password}/>
        <ConditionalButton
          onClick={fetchSignup}
          isClickable={isValidForm()}
          content='회원가입하기'/>
      </div>
    </ForBox>
  );
}

export default SignupBox;