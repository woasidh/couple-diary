import React, { ReactElement } from 'react';
import './style.scss';

export enum NotificationPopupType {
    API_ERROR = 'API 에러',
    API_FAILURE = '실패',
    NOTIFICATION = '알림'
}

interface PopupProps {
    type: NotificationPopupType;
    msg: string;
    onCloseBtnClick: (e: any) => void;
} 

const NotificationPopup = (props: PopupProps): ReactElement => {

    return (
        <div onClick = {(e): void =>{
            e.stopPropagation();
        }} className = 'popupContainer' id='notification'>
            <div className = 'header'><span>{props.type}</span></div>
            <div className = 'content'><p>{props.msg}</p></div>
            <div className = 'footer'><button onClick = {props.onCloseBtnClick}>확인</button></div>
        </div>
    );
}

export default NotificationPopup;