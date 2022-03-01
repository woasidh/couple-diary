import {ReactElement, ReactNode} from 'react';
import AppHeader from './AppHeader';
import axios from 'axios';
import {PopupUtil} from '../../shared/hoc/PopupUtil';
import {NotificationPopupType} from '../Popup/NotificationPopup';
import {logoutSuccess} from '../../reducers/User';
import {removeCoupleData} from '../../reducers/Couple';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';

const AppHeaderContainer = (): ReactElement => {

  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);

  const processLogout = (): void => {

    const initReduxStore = (): void => {
      dispatch(logoutSuccess());
      dispatch(removeCoupleData());
    }

    axios.get(process.env.REACT_APP_DB_HOST+'/api/users/logout', { withCredentials: true })
    .then(res => {
      if (res.status === 200 && res.data.success === true) {
        PopupUtil.showNotificationPopup(NotificationPopupType.NOTIFICATION, '로그아웃 되었습니다');
        initReduxStore();
        history.push('/');
      }
    })
    .catch(e => {
      PopupUtil.showNotificationPopup(NotificationPopupType.API_ERROR, e.toString());
    });
  }

  return (
    <AppHeader onClickLogoutBtn={processLogout} isLogined={!!userData}/>
  )
}

export default AppHeaderContainer;