import ReactDOM from 'react-dom';
import React from 'react'
import NotificationPopup, {NotificationPopupType} from '../Popup/NotificationPopup';
import EventAddPopup from '../Popup/EventAddPopup';
import PopupBackground from '../Popup';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from '../../redux_module';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import {CalendarEventData} from '../../redux_module/CalendarEvent';

export namespace PopupUtil {
  /**
   * 팝업 타입에 따라 메소드 네이밍 다르게 함
   * 기본적으로 BackgroundPopup안에 타입에 따라 컴포넌트 다름
   * 1. 알림팝업
   * 2. 일정추가 팝업
   */
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(ReduxThunk)
  ));

  // 팝업 제거
  const closePopup = (e: any): void => {
    e.stopPropagation();
    ReactDOM.unmountComponentAtNode(document.getElementById('popup') as HTMLElement);
  }

  // todo 중복코드 더 줄일 수 있을 거같은데

  export function showNotificationPopup(type: NotificationPopupType, popupMsg: string): void {
    ReactDOM.render(
      <Provider store={store}>
        <PopupBackground onBackgroundClick={closePopup}>
          <NotificationPopup
            onCloseBtnClick={closePopup}
            type={type}
            msg={popupMsg}/>
        </PopupBackground>
      </Provider>,
      document.getElementById('popup'));
  }

  // TODO 일정추가 팝업 만들기
  export function showEventAddPopup(onClickSubmitBtn: (date: string, data: CalendarEventData) => void): void {
    ReactDOM.render(
      <Provider store={store}>
        <PopupBackground onBackgroundClick={closePopup}>
          <EventAddPopup
            onClickCloseBtn={closePopup}
            onClickSubmitBtn={onClickSubmitBtn}
          />
        </PopupBackground>
      </Provider>,
      document.getElementById('popup')
    );
  }
}