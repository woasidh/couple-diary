import axios from 'axios';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux_module';
import { logoutSuccess } from '../../redux_module/User';
import Logo from '../../resource/images/logo.png';
import './Topbar.scss';

const Topbar = (): ReactElement => {

  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);

  const onLogoutBtnClick = (): void => {
    axios.get('/api/users/logout').then(res => {
      if (res.status === 200 && res.data.success === true) {
        alert('로그아웃되었습니다');
        dispatch(logoutSuccess());
        history.push('/');
      }
    })
  }

  return (
    <header className="topbar">
      <img src={Logo} alt="logo" />
      <div className="right_section">
        <span>Github</span>
        <span>About</span>
        {userData && <span onClick = {onLogoutBtnClick}>Logout</span>}
      </div>
    </header>
  );
}

export default Topbar;
