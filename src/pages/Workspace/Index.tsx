import React, {ReactElement} from 'react';
import './Index.scss';
import {useHistory} from 'react-router-dom';
import AgoSad from '../../resource/images/ago_sad.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux_module';

const Workspace = (): ReactElement => {
  const history = useHistory();
  const isCouple = useSelector((state: RootState) => state.user?.isCouple);

  function onClickConnectCouple(): void {
    history.push('connect');
  }

  return (
    <>
      {
        !isCouple &&
        <div className="workspace_root class_flex_center">
          <div className="single_info_container">
            <img src={AgoSad} alt="ago_sad"/>
            <div className="solo_desc">아직 커플이 아니에요...</div>
            <button onClick={onClickConnectCouple} className="link_connect">연결하러 가기</button>
          </div>
        </div>
      }
      {
        isCouple &&
        <div className = "workspace_root">
          <div className="item_container">
            <div className="item">1</div>
            <div className="item">2</div>
            <div className="item">3</div>
          </div>
        </div>
      }
    </>
  );
};

export default Workspace;
