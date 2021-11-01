import React, {ReactElement} from 'react';
import './ReduxTest.scss';

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