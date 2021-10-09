import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { getOrderedArray } from '../../../util/ArrayUtil';
import { Point } from '../../../util/Point';
import Heart from './Heart';
import './RandomHeart.scss';

const RandomHeart = () => {

    // 하트 이미지 사이즈 (브라우저 랜덤 좌표 구할 때 필요)
    const imgSize = useRef<number>(50);
    // 하트 이미지 wrapper DOM
    const container = useRef<HTMLDivElement>(null);
    // 하트 이미지 갯수
    const imgCount = useRef<number>(9);

    const [reset, setReset] = useState<boolean>(false);

    useEffect(() => {
        createHeartImage();
        setTimeout(() => {
            setReset(!reset);
        }, 2000);
    }, [reset])

    function createHeartImage(): void {
        // TODO 애들끼리 간격떨어지는 로직 짜야함
        const heartImages = 
        <>
        {getOrderedArray(imgCount.current).map((key) => (
            <Heart width = {imgSize.current}
            left = {getRandomCoordinate().x}
            top = {getRandomCoordinate().y}
            key = {key}/>
        ))}
        </>
        ReactDOM.render(heartImages, container.current);    
    }

    function getRandomCoordinate(): Point {
        const validWidth = window.innerWidth - imgSize.current;
        const validHeight = window.innerHeight - imgSize.current;

        return ({
            x: Math.random() * validWidth,
            y: Math.random() * validHeight,
        });
    }

    return (
        <div ref = {container} className = 'heart_image_wrap'>
            <img className = "a"></img>    
        </div>
    )
}

export default RandomHeart
