import React, {ReactElement} from 'react';
import './Index.scss';
import {useHistory} from 'react-router-dom';
import AgoSad from '../../resource/images/ago_sad.png';

const Workspace = (): ReactElement => {
  const history = useHistory();
  const isCouple = true;

  function onClickConnectCouple(): void {
    history.push('connect');
  }

  return (
    <>
      {!isCouple &&
        <div className="workspace_root class_flex_center">
          <div className="single_info_container">
            <img src={AgoSad} alt="ago_sad"/>
            <div className="solo_desc">아직 커플이 아니에요...</div>
            <button onClick={onClickConnectCouple} className="link_connect">연결하러 가기</button>
          </div>
        </div>
      }
      {isCouple &&
        <div className = "workspace_root">
          <div className="item_container">
            <a href = "/calendar" className = "item">캘린더</a>
            <a className = "item">메모</a>
          </div>
        </div>
      }
    </>
  );
};

export default Workspace;
