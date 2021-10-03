import React from 'react';
import './App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/Home/index';
import Login from './pages/Login/index';
import Signup from "./pages/Signup/Index";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path = '/'><Login/></Route>
              <Route exact path = '/Home'><Home/></Route>
              <Route exact path = '/signup'><Signup/></Route>
          </Switch>
      </Router>
  );
}

export default App;
