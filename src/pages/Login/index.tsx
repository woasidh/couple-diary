import React, {ReactElement, useState} from 'react';
import './index.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import EmailInput, {EmailInputStatus} from './EmailInput/EmailInput';
import logoUrl from '../../resource/images/logo.png';
import PasswordInput, {PasswordStatus} from './PasswordInput/PasswordInput';
import variables from '../../variables';
import People from '../../resource/images/social_illust.jpg';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux_module/User';
import { PopupUtil } from '../../util/PopupUtil';
import { PopupMessageType } from '../../components/Popup/Index';

interface LoginSubmitForm {
  email: string
  password: string
}

const Index = (): ReactElement => {
  const [submitContent, setSubmitContent] = useState<LoginSubmitForm>({
    email: '',
    password: '',
  });
  const [emailInputStatus, setEmailInputStatus] = useState<EmailInputStatus>({
    isValid: false,
    inputStateMsg: '',
  });
  const [passwordInputStatus, setPasswordInputStatus] = useState<PasswordStatus>(PasswordStatus.UNKNOWN);

  const history = useHistory();
  const dispatch = useDispatch();

  function onEmailInputChange(email: string, isEmailValid: boolean): void {
    setSubmitContent({
      ...submitContent,
      email,
    });
    setEmailInputStatus({
      isValid: isEmailValid,
      inputStateMsg: isEmailValid ? '유효한 이메일입니다' : '@를 포함한 이메일 형식으로 입력해주세요',
    });
  }

  function onPasswordInputChange(password: string): void {
    setSubmitContent({
      ...submitContent,
      password,
    });
    setPasswordInputStatus(PasswordStatus.UNKNOWN);
  }

  function submitLoginForm(): void {
    axios.post('/api/users/login', submitContent).then((res) => {
      console.log(res);
      if (res.status !== 200) { // 서버 통신 잘 안되었을 때
        console.log('not valid');
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
          dispatch(loginSuccess({name: res.data.userData}));
          history.push('/workspace');
        }
      }
    }).catch((e) => {
      PopupUtil.showNotificationPopup(PopupMessageType.API_ERROR, e.toString());
    });
  }

  function renderContent(): ReactElement {
    return (
      <div className="content">
        <EmailInput
          inputStatus={emailInputStatus}
          type="email"
          text="이메일"
          onChangeContent={onEmailInputChange}
        />
        <PasswordInput
          inputStatus={passwordInputStatus}
          type="password"
          text="비밀번호"
          onChangeContent={onPasswordInputChange}
        />
        <button
          onClick={submitLoginForm}
          disabled={!emailInputStatus.isValid}
          style={{
            backgroundColor: emailInputStatus.isValid ? variables.colors.primaryPink : '#E6E6EA',
          }}
        >
          로그인
        </button>
        <div className="login_keep">
          <input type="checkbox" id="keep_login"/>
          <label htmlFor="keep_login" id="custom_checkbox">로그인 상태 유지할래요</label>
        </div>
      </div>
    );
  }

  function renderFooter(): ReactElement {
    return (
      <div className="footer">
        <button className="lost_pwd">비민번호를 잊어버렸어요</button>
        <div className="signup">
          <span>아직 회원이 아니신가요? </span>
          <button>회원 가입하기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login_root">
      <div className="under_topbar">
        <div className="login_wrap">
          <div className="loginform_container">
            <LogoHeader imageUrl={logoUrl} text="로그인"/>
            {renderContent()}
            {renderFooter()}
          </div>
          <img src={People} alt="people_image"/>
        </div>
      </div>
    </div>
  );
};

export default Index;
