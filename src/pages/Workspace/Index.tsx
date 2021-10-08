import React from 'react';
import './Index.scss';
import Ago_sad from '../../resource/images/ago_sad.png';
import {useHistory} from "react-router-dom";

const Workspace = () => {

    const history = useHistory();

    function onClickConnectCouple(): void {
        history.push('connect');
    }

    return (
        <div className = 'workspace_root'>
            <div className = 'single_info_container'>
                <img src = {Ago_sad} alt = 'ago_sad'/>
                <div className = 'solo_desc'>아직 커플이 아니에요...</div>
                <button onClick={onClickConnectCouple} className = "link_connect">연결하러 가기</button>
            </div>
        </div>
    );
}

export default Workspace;