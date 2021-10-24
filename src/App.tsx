import React, { ReactElement } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Calendar/index';
import Login from './pages/Login/index';
import Signup from './pages/Signup/Index';
import Workspace from './pages/Workspace/Index';
import Fallback from './pages/Fallback/Index';
import Topbar from './components/Topbar/Topbar';
import Connect from './pages/Connect/Index';
import { AuthOption, HOC } from './util/HOC';

function App(): ReactElement {
  return (
    <>
      <Topbar />
      <Router>
        <Switch>
          <Route exact path="/" component = {HOC.checkAuth(Login, AuthOption.NO_AUTH_ONLY)}></Route>
          <Route exact path="/workspace" component = {HOC.checkAuth(Workspace, AuthOption.AUTH_ONLY)}></Route>
          <Route exact path="/calendar" component = {HOC.checkAuth(Home, AuthOption.AUTH_ONLY)}></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/connect" component = {HOC.checkAuth(Connect, AuthOption.AUTH_ONLY)}></Route>
          <Route path="*"><Fallback /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
