import ReactDOM from 'react-dom';
import React from 'react'
import NotificationPopup, {NotificationPopupType} from '../../components/Popup/NotificationPopup';
import EventAddPopup from '../../components/Popup/EventAddPopup';
import PopupBackground from '../../components/Popup';
import {CalendarEventData, CalendarEventType} from '../../reducers/CalendarEvent';

export namespace PopupUtil {
  
  // todo Popup 중복되었을 때 처리하기
  
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
    }

  // todo 중복코드 더 줄일 수 있을 거같은데

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
  export function showEventAddPopup(onClickSubmitBtn: (date: string, data: CalendarEventData) => void,
                                    data: CalendarEventData | null = null,
                                    date: string | null = null,
                                    onClickDeleteBtn?: (id: number, eventType: CalendarEventType) => void): void {
    ReactDOM.render(
      <PopupBackground onBackgroundClick={closePopup}>
        <EventAddPopup
          onClickCloseBtn={closePopup}
          onClickSubmitBtn={onClickSubmitBtn}
          data={data}
          date={date}
          onClickDeleteBtn={onClickDeleteBtn ? onClickDeleteBtn : null}
        />
      </PopupBackground>,
      document.getElementById('popup')
    );
  }
}