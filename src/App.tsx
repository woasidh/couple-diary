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
import Unauthorized from './pages/Unauthorized/Unauthorized';
import { HOC } from './util/HOC';

function App(): ReactElement {
  return (
    <>
      <Topbar />
      <Router>
        <Switch>
          <Route exact path="/" component = {Login}></Route>
          <Route exact path="/workspace" component = {HOC.fallbackLoginPage(Workspace)}></Route>
          <Route exact path="/calendar" component = {HOC.fallbackLoginPage(Home)}></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/connect" component = {HOC.fallbackLoginPage(Connect)}></Route>
          <Route path="*"><Fallback /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
