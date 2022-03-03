import React, {ReactElement} from 'react';
import './Index.scss';
import {useHistory} from 'react-router-dom';
import AgoSad from '../../resource/images/ago_sad.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';

const Workspace = (): ReactElement => {
  const history = useHistory();
  const isCouple = useSelector((rootState: RootState) => rootState.couple?.isCouple);

  const onClickConnectCouple = (): void => {
    history.push('connect');
  }

  return (
    <>
      {!isCouple &&
        <div className="workspaceContentsWrapper class_flex_center">
          <div className="single_info_container">
            <img src={AgoSad} alt="ago_sad"/>
            <div className="solo_desc">아직 커플이 아니에요...</div>
            <button onClick={onClickConnectCouple} className="link_connect">연결하러 가기</button>
          </div>
        </div>
      }
      {isCouple &&
        <div className = "workspaceContentsWrapper">
          <div className="item_container">
            <button className = "item" onClick = {(): void => history.push('/calendar')}>캘린더</button>
            <button className = "item" onClick = {(): void => history.push('/write')}>데이트 기록 작성</button>
          </div>
        </div>
      }
    </>
  );
};

export default Workspace;
