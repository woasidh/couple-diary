import axios from 'axios';
import React, {ReactElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {RootState} from '../../redux_module';
import {logoutSuccess} from '../../redux_module/User';
import Logo from '../../resource/images/logo.png';
import {PopupUtil} from '../../util/PopupUtil';
import {PopupMessageType} from '../Popup/Index';
import './Topbar.scss';

const Topbar = (): ReactElement => {

  const gitHubURL = 'https://github.com/woasidh?tab=repositories';
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);

  const onLogoutBtnClick = (): void => {
    axios.get('/api/users/logout').then(res => {
      if (res.status === 200 && res.data.success === true) {
        PopupUtil.showNotificationPopup(PopupMessageType.NOTIFICATION, '로그아웃 되었습니다');
        dispatch(logoutSuccess());
        history.push('/');
      }
    }).catch(e => {
      PopupUtil.showNotificationPopup(PopupMessageType.API_ERROR, e.toString());
    });
  }

  return (
    <header className="topbar">
      <div className='left_section'>
        <img src={Logo} alt="logo" />
      </div>
      <div className="right_section">
        <span><a href = {gitHubURL} target={'_blank'}>Github</a></span>
        <span>About</span>
        {userData && <span onClick={onLogoutBtnClick}>Logout</span>}
      </div>
    </header>
  );
}

export default Topbar;
