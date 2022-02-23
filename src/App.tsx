import React, { ReactElement } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Calendar/CalendarPage';
import LoginPage from './pages/Login/LoginPage';
import Signup from './pages/Signup/Index';
import Workspace from './pages/Workspace/WorkspacePage';
import Fallback from './pages/Fallback/Index';
import AppHeader from './components/Topbar/AppHeader';
import Connect from './pages/Connect/Index';
import { AuthOption, HOC } from './components/Util/HOC';
import Write from './pages/Write/Write';

function App(): ReactElement {
  return (
    <>
      <Router>
      <AppHeader />
        {/* header 아래 부분 appContent 하나로 통합 */}
        <div className = 'appContent'>
          <Switch>
            <Route exact path="/" component = {HOC.checkAuth(LoginPage, AuthOption.NO_AUTH_ONLY)}/>
            <Route exact path="/workspace" component = {HOC.checkAuth(Workspace, AuthOption.AUTH_ONLY)}/>
            <Route exact path="/calendar" component = {HOC.checkAuth(Home, AuthOption.AUTH_ONLY)}/>
            <Route exact path="/signup"><Signup /></Route>
            <Route exact path="/connect" component = {HOC.checkAuth(Connect, AuthOption.AUTH_ONLY)}/>
            <Route exact path="/write" component = {HOC.checkAuth(Write, AuthOption.AUTH_ONLY)}/>
            <Route path="*"><Fallback /></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
