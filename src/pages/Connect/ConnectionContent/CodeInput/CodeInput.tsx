import {ReactElement, useEffect, useRef, useState} from 'react';
import {ArrayUtil} from '../../../../util/ArrayUtil';
import {StringUtil} from '../../../../util/StringUtil';
import axios from 'axios';
import {PopupUtil} from '../../../../components/Util/PopupUtil';
import {NotificationPopupType} from '../../../../components/Popup/NotificationPopup';
import {useHistory} from 'react-router-dom';

enum CodeStatus {
  NOT_FULL,
  FULL,
  NO_VALID_CODE
}

const CodeInput = (): ReactElement => {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState<Array<number>>(Array(6).fill(-1));
  const [status, setStatus] = useState<CodeStatus>(CodeStatus.NOT_FULL);

  const history = useHistory();

  useEffect(() => {
    code.filter((val) => val !== -1).length === 6
      ? setStatus(CodeStatus.FULL) : setStatus(CodeStatus.NOT_FULL)
  }, [code]);

  function onClickSubmitBtn(): void {
    axios.post('/api/connection/connect', {code}).then(res => {
      if (res.status !== 200) {
        PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, res.data.toString());
      } else if (res.status === 200) {
        if (res.data.success === false) {
          PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err.toString());
        }
        if (res.data.success === true) {
          PopupUtil.showNotificationPopup(NotificationPopupType.NOTIFICATION, `축하합니다 ${res.data.name}님과 연결되었어요!`);
          history.push('/workspace');
        }
      }
    }).catch(e => {
      PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
    })
  }

  function onInputFocus(e: any): void {
    if (!e.target.value) return;

    // 이미 값이 있으면 state idx는 -1로 초기화
    const idx = parseInt(e.target.id);
    e.target.value = '';
    const newCode: Array<number> = idx !== 5
      ? [...code.slice(0, idx), -1, ...code.slice(idx + 1)]
      : [...code.slice(0, idx), -1];
    setCode(newCode);
  }

  function onInputKeyDown(e: any): void {
    // 숫자아니면 return
    if (!StringUtil.isKeyCodeOneDigitNumber(e.keyCode)) {
      e.preventDefault();
      return;
    }

    // state 배열 idx 업데이트
    const idx = parseInt(e.target.id);
    const inputNum = parseInt(e.keyCode) - 48;
    if (e.target.value) e.target.value = '';
    const newCode: Array<number> = idx !== 5
      ? [...code.slice(0, idx), inputNum, ...code.slice(idx + 1)]
      : [...code.slice(0, idx), inputNum];
    setCode(newCode);
  }

  function onInputKeyUp(e: any): void {
    if (!StringUtil.isKeyCodeOneDigitNumber(e.keyCode)) return;

    // 다음 input 빈배열로 만들기
    if (inputContainerRef.current && !!e.target.value) {
      const idx = parseInt(e.target.id);
      const targetInput = inputContainerRef.current.children[idx + 1] as HTMLInputElement;
            targetInput?.focus();
    }
  }

  function codeInputItems(): Array<ReactElement> {
    return ArrayUtil.getOrderedArray(6).map((key) => (
      <input
        className="codeInputItem"
        type="number"
        id={key.toString()}
        key={key}
        onFocus={onInputFocus}
        onKeyDown={onInputKeyDown}
        onKeyUp={onInputKeyUp}
      />
    ));
  }

  function renderStatusString(): string {
    switch (status){
      case CodeStatus.NOT_FULL:
        return '6자리를 입력해주세요';
      case CodeStatus.FULL:
        return '6자리가 입력되었습니다';
      case CodeStatus.NO_VALID_CODE:
        return '일치하는 코드가 없습니다';
      default:
        return '';
    }
  }

  return (
    <>
      <div className="codeInputContainer" ref={inputContainerRef}>{codeInputItems()}</div>
      <div className="invitationCodeStatus" style = {{
        color: status === CodeStatus.FULL ? 'green' : 'red'
      }}>{renderStatusString()}</div>
      <button className="codeSubmitBtn" onClick={onClickSubmitBtn}>확인</button>
    </>
  );
};

export default CodeInput;
