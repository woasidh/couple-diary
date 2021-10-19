import React from 'react';
import Logo from '../../resource/images/logo.png';
import './Topbar.scss';

const Topbar = () => {
    return (
        <header className="topbar">
            <img src={Logo} alt="logo"/>
            <div className = "right_section">
                <span>Github</span>
                <span>About</span>
            </div>
        </header>
    );
}

export default Topbar;