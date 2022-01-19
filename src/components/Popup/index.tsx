import React, {ReactElement} from 'react'
import './style.scss'
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from '../../redux_module';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';

interface PopupBackgroundProps {
  onBackgroundClick: (e: any) => void;
  children: React.ReactNode
}

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(ReduxThunk)
));

const PopupBackground = (props: PopupBackgroundProps): ReactElement => {
  return (
    <Provider store={store}>
      <div className='popupBackground' onClick={props.onBackgroundClick}>
        {props.children}
      </div>
    </Provider>
  )
}

export default PopupBackground;