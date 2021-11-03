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
      <div className="workspace_root">
        {
          !isCouple &&
          <div className="single_info_container">
            <img src={AgoSad} alt="ago_sad"/>
            <div className="solo_desc">아직 커플이 아니에요...</div>
            <button onClick={onClickConnectCouple} className="link_connect">연결하러 가기</button>
          </div>
        }
        {
          isCouple &&
          <div>
            워크스페이스에 오신걸 환영합니다!
          </div>
        }
      </div>
    </>
  );
};

export default Workspace;
