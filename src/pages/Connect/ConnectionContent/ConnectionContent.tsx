import React, {ReactElement, useEffect, useState} from 'react';
import './ConnectionContent.scss';
import AgoComehere from '../../../resource/images/ago_comehere.png';
import {ArrayUtil} from '../../../util/ArrayUtil';
import Counter from './Counter/Counter';
import CodeInput from './CodeInput/CodeInput';
import axios from 'axios';
import {PopupUtil} from '../../../components/Util/PopupUtil';
import {NotificationPopupType} from '../../../components/Popup/NotificationPopup';

const ConnectionContent = (): ReactElement => {

  const [refresh, setRefresh] = useState<boolean>(false);
  const [myCode, setMyCode] = useState<Array<number> | null>(null);

  useEffect((): void => {

    const randomCode = ArrayUtil.getRandomNumberArray(6);

    axios.post('/api/connection/create', {
      code: randomCode
    }).then(res => {
      if (res.data.success === false) {
        PopupUtil.showNotificationPopup(NotificationPopupType.API_FAILURE, res.data.err.toString());
      } else {
        setMyCode(randomCode);
      }
    }).catch(e => {
      PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
    });
  }, [refresh]);

  return (
    <div className="ConnectionContentContainer">
      <img src={AgoComehere} width={200} alt="ago_comehere"/>
      <MyInvitationCode code = {myCode}/>
      <div className="invitationGuide">
        <span>상대방의 코드를 입력해주세요</span>
        <Counter second={180} onRefreshBtnClick = {(): void => setRefresh(!refresh)}/>
      </div>
      <CodeInput/>
    </div>
  );
};

/**
 * 내 초드 코드 component
 */

interface MyInvitationCodeProps {
  code: Array<number> | null;
}
const MyInvitationCode = (props: MyInvitationCodeProps): ReactElement => {
  function renderCodeItems(): Array<ReactElement> | null {
    return props.code && props.code.map((key, idx) => (
      <div className="codeItem" key={idx}>{key}</div>
    ));
  }

  return (
    <div className="myInvitationContainer">
      <span>내 초드코드</span>
      <div className="myInvitationCode">
        {renderCodeItems()}
      </div>
    </div>
  );
};

export default ConnectionContent;
