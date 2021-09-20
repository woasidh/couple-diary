import React from 'react';
import logo from '../../resource/images/logo.png';
import './index.scss';

const Index = () => {
    return (
        <div className = "login">
            <div className = "container">
                <div className = "header">
                    <img src = {logo} alt = "logo"/>
                    <div>로그인</div>
                </div>
                <div className = "content">
                    <div className = "login_input" id = "email">
                        <span>이메일</span>
                        <input type = "text"/>
                    </div>
                    <div className = "login_input" id = "pwd">
                        <span>비밀번호</span>
                        <input type = "text"/>
                    </div>
                    <button>로그인</button>
                    <div className = "login_keep">
                        <input type = "checkbox" id = "keep_login"/>
                        <label htmlFor = "keep_login" id = "custom_checkbox">로그인 상태 유지할래요</label>
                    </div>
                </div>
                <div className = "footer">
                    <button className = "lost_pwd">비민번호를 잊어버렸어요</button>
                    <div className = "signup">
                        <span>아직 회원이 아니신가요?</span>
                        <button>회원 가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;