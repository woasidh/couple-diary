import React, {ReactElement, useState} from 'react';
import './index.scss';
import LogoHeader from "../../components/LogoHeader/LogoHeader";
import Input from '../../components/Input/Input';
import logoUrl from '../../resource/images/logo.png';
import axios from 'axios';

interface LoginSubmitForm {
    email: string
    password: string
}

const Index = (): ReactElement => {

    const [submitContent, setSubmitContent] = useState<LoginSubmitForm>({
        email: '',
        password: ''
    });

    function renderContent(): ReactElement {
        return (
            <div className = "content">
                <Input type = "email" text = "이메일" onChangeContent = {onEmailInputChange}/>
                <Input type = "password" text = "비밀번호" onChangeContent = {onPasswordInputChange}/>
                <button onClick = {submitLoginForm}>로그인</button>

                <div className = "login_keep">
                    <input type = "checkbox" id = "keep_login"/>
                    <label htmlFor = "keep_login" id = "custom_checkbox">로그인 상태 유지할래요</label>
                </div>
            </div>
        );
    }


    function renderFooter(): ReactElement {
        return (
            <div className = "footer">
                <button className = "lost_pwd">비민번호를 잊어버렸어요</button>
                <div className = "signup">
                    <span>아직 회원이 아니신가요?</span>
                    <button>회원 가입하기</button>
                </div>
            </div>
        );
    }

    function onEmailInputChange(email: string): void {
        setSubmitContent({
            ...submitContent,
            email: email
        });
    }

    function onPasswordInputChange(password: string): void {
        setSubmitContent({
            ...submitContent,
            password: password
        });
    }

    function submitLoginForm(): void {
        //console.log('submit Data: ', submitContent);
        axios.post('http://localhost:5000/users/login', submitContent).then((res) => {
            console.log(res);
        })
    }

    return (
        <div className = "login">
            <div className = "loginform_container">
                <LogoHeader imageUrl = {logoUrl} text = "로그인"/>
                {renderContent()}
                {renderFooter()}
            </div>
        </div>
    );
}

export default Index;