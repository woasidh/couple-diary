import {ReactElement} from 'react';
import LoginForm from './LoginForm';
import {loginSuccess} from '../../../../reducers/User';
import {updateCoupleStatus} from '../../../../reducers/Couple';
import {useDispatch} from 'react-redux';

const LoginFormContainer = (): ReactElement => {

  const dispatch = useDispatch();

  const updateUserStore = (data: any): void => {
    dispatch(loginSuccess(data.userData));
    dispatch(updateCoupleStatus(data.coupleData));
  }

  return (
    <LoginForm onLoginSuccess={updateUserStore}/>
  )
}

export default LoginFormContainer;