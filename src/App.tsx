import React from 'react';
import './App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/Calendar/index';
import Login from './pages/Login/index';
import Signup from './pages/Signup/Index';
import Workspace from './pages/Workspace/Index';
import Fallback from "./pages/Fallback/Index";
import Topbar from "./components/Topbar/Topbar";
import Connect from "./pages/Connect/Index";

function App() {
    return (
        <>
            <Topbar/>
            <Router>
                <Switch>
                    <Route exact path='/'><Login/></Route>
                    <Route exact path='/workspace'><Workspace/></Route>
                    <Route exact path='/calendar'><Home/></Route>
                    <Route exact path='/signup'><Signup/></Route>
                    <Route exact path='/connect'><Connect/></Route>
                    <Route path='*'><Fallback/></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
