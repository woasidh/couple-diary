import {ReactElement, useState} from 'react';
import LoginForm from './LoginForm';
import {loginSuccess} from '../../../../reducers/User';
import {updateCoupleStatus} from '../../../../reducers/Couple';
import {useDispatch} from 'react-redux';
import {EmailInputStatus} from './EmailInput/EmailInput';
import {PasswordStatus} from './PasswordInput/PasswordInput';
import axios from 'axios';
import {PopupUtil} from '../../../../shared/hoc/PopupUtil';
import {NotificationPopupType} from '../../../../components/Popup/NotificationPopup';
import {useHistory} from 'react-router';

export interface LoginSubmitForm {
  email: string
  password: string
}

const LoginFormContainer = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [submitContent, setSubmitContent] = useState<LoginSubmitForm>({email: '', password: ''});
  const [emailInputStatus, setEmailInputStatus] = useState<EmailInputStatus>({isValid: false, inputStateMsg: ''});
  const [passwordInputStatus, setPasswordInputStatus] = useState<PasswordStatus>(PasswordStatus.UNKNOWN);

  function updateEmailStatus(email: string, isEmailValid: boolean): void {
    setSubmitContent({...submitContent, email});
    setEmailInputStatus({
      isValid: isEmailValid,
      inputStateMsg: isEmailValid ? '유효한 이메일입니다' : '@를 포함한 이메일 형식으로 입력해주세요',
    });
  }

  function updatePasswordStatus(password: string): void {
    setSubmitContent({...submitContent, password});
    setPasswordInputStatus(PasswordStatus.UNKNOWN);
  }

  function submitForm(): void {
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
          // 로그인 성공 시, redux state 변경
          dispatch(loginSuccess(data.userData));
          dispatch(updateCoupleStatus(data.coupleData));
          history.push('/workspace');
        }
      }
    });
  }


  return (
    <LoginForm
    submitContent={submitContent}
    emailInputStatus={emailInputStatus}
    passwordInputStatus={passwordInputStatus}
    onSubmit={submitForm}
    onEmailInputChange={updateEmailStatus}
    onPasswordInputChange={updatePasswordStatus}
    />
  )
}

export default LoginFormContainer;