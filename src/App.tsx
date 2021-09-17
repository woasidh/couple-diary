import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/Home/index';
import Login from './pages/Login/index';

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path = '/'>
                  <Home/>
              </Route>
              <Route exact path = '/login'>
                  <Login/>
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
