import React, { ReactElement } from 'react';
import './Unauthorized.scss';
import AgoFrustrated from '../../resource/images/ago_frustrated.png';
import { useHistory } from 'react-router';

const Unauthorized = (): ReactElement => {

    console.log('unauthorized rendered');

    const history = useHistory();

    const onLinkToLoginPageBtnClick = (): void => {
        history.push('/');
    }

    return (
        <div className='unauthorized_root'>
            <div className='content_wrapper'>
                <img src={AgoFrustrated} width={200} alt="ago_frustrated" />
                <div>이 페이지에 대한 권한이 없어요...</div>
                <button onClick = {onLinkToLoginPageBtnClick}>로그인 하러 가기</button>
            </div>
        </div>
    )
}

export default Unauthorized;