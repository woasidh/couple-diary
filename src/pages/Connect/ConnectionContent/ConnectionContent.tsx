import React, { ReactElement } from 'react';
import './ConnectionContent.scss';
import AgoComehere from '../../../resource/images/ago_comehere.png';
import { ArrayUtil } from '../../../util/ArrayUtil';
import Counter from './Counter/Counter';
import CodeInput from './CodeInput/CodeInput';

const ConnectionContent = (): ReactElement => (
  <div className="ConnectionContentContainer">
    <img src={AgoComehere} width={200} alt="ago_comehere" />
    <MyInvitationCode />
    <InvitationGuide />
    <CodeInput />
  </div>
);

const MyInvitationCode = (): ReactElement => {
  function renderCodeItems(): Array<ReactElement> {
    return ArrayUtil.getRandomNumberArray(6).map((key, idx) => (
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

const InvitationGuide = (): ReactElement => (
  <div className="invitationGuide">
    <span>상대방의 코드를 입력해주세요</span>
    <Counter second={180} />
  </div>
);

export default ConnectionContent;
