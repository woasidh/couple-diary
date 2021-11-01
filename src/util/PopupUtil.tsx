import ReactDOM from 'react-dom';
import React from 'react'
import Popup, { PopupMessageType } from '../components/Popup';

export namespace PopupUtil {
    export function showNotificationPopup(type: PopupMessageType, popupMsg: string): any {
        ReactDOM.render(
            <Popup 
            onCloseBtnClick = {(): void => {
                ReactDOM.unmountComponentAtNode(document.getElementById('popup') as HTMLElement);
            }}
            type = {type}
            msg = {popupMsg}/>,
            document.getElementById('popup'));
    }
}