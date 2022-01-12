import ReactDOM from 'react-dom';
import React from 'react'
import NotificationPopup, {NotificationPopupType} from '../components/Popup/NotificationPopup';
import EventAddPopup from '../components/Popup/EventAddPopup';
import PopupBackground from '../components/Popup';

export namespace PopupUtil {

  /**
   * 팝업 타입에 따라 메소드 네이밍 다르게 함
   * 기본적으로 BackgroundPopup안에 타입에 따라 컴포넌트 다름
   * 1. 알림팝업
   * 2. 일정추가 팝업
   */

  // 팝업 제거
  const closePopup = (e: any): void => {
    e.stopPropagation();
    ReactDOM.unmountComponentAtNode(document.getElementById('popup') as HTMLElement);
    console.log('parent clicked');
  }

  export function showNotificationPopup(type: NotificationPopupType, popupMsg: string): void {
    ReactDOM.render(
      <PopupBackground onBackgroundClick={closePopup}>
        <NotificationPopup
          onCloseBtnClick={closePopup}
          type={type}
          msg={popupMsg}/>
      </PopupBackground>,
      document.getElementById('popup'));
  }

  // TODO 일정추가 팝업 만들기
  export function showEventAddPopup(): void {
    ReactDOM.render(
      <PopupBackground onBackgroundClick={closePopup}>
        <EventAddPopup/>
      </PopupBackground>,
      document.getElementById('popup')
    );
  }
}