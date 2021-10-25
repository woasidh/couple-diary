import React, {ReactElement} from 'react';
import './ReduxTest.scss';
import {useDispatch, useSelector} from 'react-redux';
import {increaseCounter} from '../../redux_module/Counter';
import {RootState} from '../../redux_module';

const ReduxTest = (): ReactElement => {

  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.counter.count);

  return (
    <>
      <div className = "redux_root">
        <div>
          <div>{selector}</div>
          <button onClick = {(): void => {
            dispatch(increaseCounter());
          }}>+</button>
        </div>
      </div>
    </>
  );
}

export default ReduxTest;