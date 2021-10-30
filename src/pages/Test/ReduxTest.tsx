import React, {ReactElement, useEffect} from 'react';
import './ReduxTest.scss';
import {useDispatch, useSelector} from 'react-redux';
import {increaseCounter} from '../../redux_module/Counter';
import {RootState} from '../../redux_module';
import axios from 'axios';

const ReduxTest = (): ReactElement => {

  //const dispatch = useDispatch();
  //const selector1 = useSelector((state: RootState) => state.user.status);

  return (
    <>
      <div className = "redux_root">
        <div>
          <button onClick={(): any => {
            //
          }}>+</button>
        </div>
      </div>
    </>
  );
}

export default ReduxTest;