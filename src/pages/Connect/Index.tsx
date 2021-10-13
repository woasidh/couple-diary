import React from 'react';
import ConnectionContent from './ConnectionContent/ConnectionContent';
import './Index.scss';
import RandomHeart from './RandomHeart/RandomHeart';

const Connect = () => {

    return (
        <div className = 'connect_root'>
            <RandomHeart/>
            <ConnectionContent/>
        </div>
    );
}

export default Connect;