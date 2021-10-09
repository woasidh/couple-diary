import React, {useEffect, useRef} from 'react';
import './Index.scss';
import Heart from '../../resource/images/heart.png';
import {Point} from "../../util/Point";

const Connect = () => {

    const imgSize = useRef<number>(50);
    const container = useRef<HTMLDivElement>(null);

    function makeHeart(): void {
        console.log('하트 그려짐');
    }

    function deleteHeart(): void {
        console.log('하트 지워짐');
    }

    function getRandomCoordinate(): Point {
        const validWidth = window.innerWidth - imgSize.current;
        const validHeight = window.innerHeight - imgSize.current;

        console.log(window.innerWidth, window.innerHeight, Math.random() * validWidth, Math.random() * validHeight);

        return ({
            x: Math.random() * validWidth,
            y: Math.random() * validHeight,
        });
    }

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
            <div ref = {container} className = 'heart_image_wrap'/>
        </div>
    );
}

export default Connect;