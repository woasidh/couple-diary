import React, { ReactElement, useEffect } from 'react';
import './Index.scss';

export enum PopupMessageType {
    API_ERROR = 'api error'
}

interface PopupProps {
    type: PopupMessageType;
    msg: string;
    onCloseBtnClick: () => void;
} 

const Popup = (props: PopupProps): ReactElement => {

    return (
        <div onClick = {props.onCloseBtnClick} className = 'popupBackground'>
            <div className = 'popupContainer'>
                <div className = 'header'>
                    <span>{props.type}</span>
                </div>
                <div className = 'content'>
                    <p>{props.msg}</p>
                </div>
                <div className = 'footer'>
                    <button onClick = {props.onCloseBtnClick}>확인</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;