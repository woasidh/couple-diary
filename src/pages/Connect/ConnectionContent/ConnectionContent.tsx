import React, { ReactElement } from 'react';
import './ConnectionContent.scss';
import Ago_comehere from '../../../resource/images/ago_comehere.png';

const ConnectionContent = () => {
    return (
        <div className='ConnectionContentContainer'>
            <img src={Ago_comehere} width={200} alt = 'ago_comehere' />
            <MyInvitationCode/>
            <InvitationGuide />
            <CodeInput/>
            <InvitationCodestatus/>
            <button className = "codeSubmitBtn">확인</button>
        </div>
    );
}

const MyInvitationCode = () => {

    function renderCodeItems(): Array<ReactElement> {
        return [1, 2, 3, 4, 5, 6].map((key) => (
            <div className="codeItem">{key}</div>
        ));
    }

    return (
        <div className="myInvitationContainer">
            <span>내 초드코드</span>
            <div className="myInvitationCode">
                {renderCodeItems()}
            </div>
        </div>
    );
}

const InvitationGuide = () => {
    return (
        <div className="invitationGuide">
            <span>상대방의 코드를 입력해주세요</span>
            <span className='counter'>03:00</span>
        </div>
    );
}

const CodeInput = () => {

    function codeInputItems(): Array<ReactElement> {
        return [1, 2, 3, 4, 5, 6].map((key) => (
            <div className="codeInputItem" key = {key}/>
        ));
    }

    return (
        <div className="codeInputContainer">
            {codeInputItems()}
        </div>
    );
}

const InvitationCodestatus = () => {
    return (
        <div className = 'invitationCodeStatus'>6자리를 모두 채워주세요</div>
    );
}

export default ConnectionContent;