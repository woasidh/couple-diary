import React from 'react';
import logo from '../../resource/images/logo.png';

const Index = () => {
    return (
        <div className = "login_page">
            <div className = "container">
                <img src = {logo} alt = "logo"/>
                <div>로그인</div>
                <div className = "input_text" id = "email">이메일</div>
                <input type = "text"/>
                <div className = "input_text" id = "pwd">비밀번호</div>
                <input type = "text"/>
                <button>로그인</button>
                <input type = "checkbox"/>
                <span>로그인 상태 유지할래요</span>
                <button>비민번호를 잊어버렸어요</button>
                <span>아직 회원이 아니신가요?</span>
                <button>회원 가입하기</button>
            </div>
        </div>
    );
}

export default Index;