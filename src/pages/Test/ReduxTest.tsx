import React, {ReactElement} from 'react';
import './ReduxTest.scss';
import {useDispatch} from 'react-redux';
import {increaseCount} from './Counter';

const ReduxTest = (): ReactElement => {
  const dispatch = useDispatch();

  return (
    <>
      <div className = "redux_root">
        <div>
          <button onClick = {(): void => {
            dispatch(increaseCount())
          }}>+</button>
        </div>
      </div>
    </>
  );
}

export default ReduxTest;