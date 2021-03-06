import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './reducers';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(ReduxThunk)
));

ReactDOM.render(
  <Provider store = {store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
