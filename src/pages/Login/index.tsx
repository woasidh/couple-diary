import React, {ReactElement, useRef, useState} from 'react';
import './index.scss';
import LogoHeader from "../../components/LogoHeader/LogoHeader";
import EmailInput from './EmailInput/EmailInput';
import logoUrl from '../../resource/images/logo.png';
import axios from 'axios';
import PasswordInput from "./PasswordInput/PasswordInput";
import variables from '../../variables';

interface LoginSubmitForm {
    email: string
    password: string
}

const Index = (): ReactElement => {

    const [submitContent, setSubmitContent] = useState<LoginSubmitForm>({
        email: '',
        password: ''
    });
    const [isValidEmail, setIsValidEmail] = useState(false);
    const emailInputMessage = useRef<HTMLSpanElement>(null);

    function renderContent(): ReactElement {
        return (
            <div className="content">
                <EmailInput inputMsgRef={emailInputMessage} type="email" text="이메일" onChangeContent={onEmailInputChange}/>
                <PasswordInput type="password" text="비밀번호" onChangeContent={onPasswordInputChange}/>
                <button onClick={submitLoginForm} disabled={!isValidEmail} style = {{
                    backgroundColor: isValidEmail ? variables.colors.primaryPink : '#E6E6EA'
                }}>로그인</button>
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

    function onEmailInputChange(email: string, isEmailValid: boolean): void {
        setSubmitContent({
            ...submitContent,
            email: email
        });
        setIsValidEmail(isEmailValid);
    }

    function onPasswordInputChange(password: string): void {
        setSubmitContent({
            ...submitContent,
            password: password
        });
    }

    function submitLoginForm(): void {
        axios.post('http://localhost:5000/users/login', submitContent).then((res) => {
            if (res.status !== 200) { // 서버 통신 잘 안되었을 때
                console.log('not valid');
            } else { // 서버 통신 잘되었을 때
                const data = res.data;
                if (!data.success) {
                    if (data.errMsg === 'PASSWORD_MISMATCH') { // 비밀번호 불일치일 떄
                        console.log('password mismatch')
                    } else if (data.errMsg === 'NO_MATCH_ID') { // ID가 없을 때
                        const current = emailInputMessage.current;
                        if (!!current) {
                            current.innerText = '일치하는 ID가 없습니다';
                            current.style.color = '#FE4A49';
                        }
                    }
                } else {
                    console.log('login success');
                }
            }
        }).catch(e => {
            /**
             * 여기서 잘못되었다고 표시
             * TODO 팝업 만들기
             */
        });
    }

    return (
        <div className="login">
            <div className="loginform_container">
                <LogoHeader imageUrl={logoUrl} text="로그인"/>
                {renderContent()}
                {renderFooter()}
            </div>
        </div>
    );
}

export default Index;