import React, {useEffect, useRef} from 'react';
import './Index.scss';
import Heart from '../../resource/images/heart.png';
import {Point} from "../../util/Point";

const Connect = () => {

    const imgSize = useRef<number>(50);

    function makeHeart(): void {
        console.log('하트 그려짐');
    }

    function deleteHeart(): void {
        console.log('하트 지워짐');
    }

    function getRandomCoordinate(): Point {
        const validWidth = window.innerWidth - imgSize.current;
        const validHeight = window.innerHeight - imgSize.current;

        return ({
            x: Math.random() * validWidth,
            y: Math.random() * validHeight,
        });
    }

    setInterval(() => {
        const container1 = document.querySelector('.connect_root');
        const img = document.createElement('img');
        img.src = Heart;
        img.alt = "a";
        img.width = 50;
        img.style.transform = `translate(${getRandomCoordinate().x}px, ${getRandomCoordinate().y}px)`;
        console.log(container1);
        if (container1) container1.appendChild(img);
    }, 1000);

    return (
        <div className = 'connect_root'>
        </div>
    );
}

export default Connect;