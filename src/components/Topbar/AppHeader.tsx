import axios from 'axios';
import React, {ReactElement, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {RootState} from '../../redux_module';
import {logoutSuccess} from '../../redux_module/User';
import Logo from '../../resource/images/logo.png';
import {PopupUtil} from '../Util/PopupUtil';
import {NotificationPopupType} from '../Popup/NotificationPopup';
import './Topbar.scss';
import {removeCoupleData} from '../../redux_module/Couple';
// todo img height 맞추기
import MenuClose from '../../resource/images/menu_close.png';
import MenuOpen from '../../resource/images/menu_open.png';

const gitHubURL = 'https://github.com/woasidh?tab=repositories';

// todo react-responsive 사용하기
// todo refactoring하기

const AppHeader = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  }

  const onClickLogoutBtn = (): void => {
    axios.get('/api/users/logout').then(res => {
      if (res.status === 200 && res.data.success === true) {
        PopupUtil.showNotificationPopup(NotificationPopupType.NOTIFICATION, '로그아웃 되었습니다');
        dispatch(logoutSuccess());
        dispatch(removeCoupleData());
        history.push('/');
      }
    }).catch(e => {
      PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
    });
  }

  return (
    <header className='appHeader'>
      <div className="topbar">
        <div className='left_section'>
          <img src={Logo} alt="logo"/>
        </div>
        <div className="right_section" id='PC'>
          <span><a href={gitHubURL} target={'_blank'}>Github</a></span>
          {userData && <span onClick={onClickLogoutBtn}>Logout</span>}
        </div>
        <div className="right_section" id='mobile'>
          <button onClick={toggleMenu}>
            <img className='menu_close' src={isMenuOpen ? MenuOpen : MenuClose}/>
          </button>
        </div>
      </div>
      <div className = {`subMenu ${isMenuOpen ? 'open' : ''}`}>
        <a href = {gitHubURL} target={'_blank'}>Github</a>
        {userData && <span onClick={onClickLogoutBtn}>Logout</span>}
      </div>
    </header>
  );
}

interface PcHeaderProps {
  userData: any;
  onClickLogoutBtn: () => void;
}

const PcHeader = ({userData, onClickLogoutBtn}: PcHeaderProps): ReactElement => {
  return (
    <header className="topbar">
      <div className='left_section'>
        <img src={Logo} alt="logo"/>
      </div>
      <div className="right_section" id='PC'>
        <span><a href={gitHubURL} target={'_blank'}>Github</a></span>
        {userData && <span onClick={onClickLogoutBtn}>Logout</span>}
      </div>
    </header>
  )
}

interface MobileMenuProps {
  userData: any;
  onClickLogoutBtn: () => void;
}

const MobileHeader = (props: MobileMenuProps): ReactElement => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="topbar">
      <div className='left_section'>
        <img src={Logo} alt="logo"/>
      </div>
      <div className="right_section" id='mobile'>
        <button onClick={toggleMenu}>
          <img className='menu_close' src={isMenuOpen ? MenuOpen : MenuClose}/>
        </button>
        {/*<div className = {`subMenu ${isMenuOpen ? 'open' : ''}`}>*/}
        {/*  <a href = {gitHubURL} target={'_blank'}>Github</a>*/}
        {/*  {!props.userData && <span onClick={props.onClickLogoutBtn}>Logout</span>}*/}
        {/*</div>*/}
      </div>
    </header>
  )
}

export default AppHeader;