import React, { ReactElement } from 'react';
import './style.scss';

export enum PopupMessageType {
    API_ERROR = 'API 에러',
    API_FAILURE = '실패',
    NOTIFICATION = '알림'
}

interface PopupProps {
    type: PopupMessageType;
    msg: string;
    onCloseBtnClick: (e: any) => void;
} 

const Popup = (props: PopupProps): ReactElement => {

    return (
        <div onClick = {props.onCloseBtnClick} className = 'popupBackground'>
            <div onClick = {(e): void =>{
                e.preventDefault();
                e.stopPropagation();
            }} className = 'popupContainer'>
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