import React, {ReactElement, useEffect} from 'react';
import './ReduxTest.scss';
import {useDispatch, useSelector} from 'react-redux';
import {increaseCounter} from '../../redux_module/Counter';
import {RootState} from '../../redux_module';
import {requestLogin} from '../../redux_module/User';
import axios from 'axios';

const ReduxTest = (): ReactElement => {

  const dispatch = useDispatch();
  const selector1 = useSelector((state: RootState) => state.user.status);
  const selector2 = useSelector((state: RootState) => state.user.email);

  return (
    <>
      <div className = "redux_root">
        <div>
          <div>status: {selector1.toString()}</div>
          <div>email: {selector2}</div>
          <button onClick={(): any => {
            dispatch(requestLogin());
          }}>+</button>
        </div>
      </div>
    </>
  );
}

export default ReduxTest;