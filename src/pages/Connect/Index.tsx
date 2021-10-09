import React from 'react';
import './Index.scss';
import RandomHeart from './RandomHeart/RandomHeart';

const Connect = () => {

    // setInterval(() => {
    //     const img = document.createElement('img');
    //     img.src = Heart;
    //     img.alt = "a";
    //     img.width = 50;
    //     img.style.transform = `translate(${getRandomCoordinate().x}px, ${getRandomCoordinate().y}px)`;
    //     container.current?.appendChild(img);
    // }, 1000);

    return (
        <div className = 'connect_root'>
            <RandomHeart/>
        </div>
    );
}

export default Connect;