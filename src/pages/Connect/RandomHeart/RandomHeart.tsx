import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { getOrderedArray } from '../../../util/ArrayUtil';
import { Point } from '../../../util/Point';
import Heart from './Heart';
import './RandomHeart.scss';

const RandomHeart = () => {

    /**
     * heart image 로직
     * 
     */

    // 하트 이미지 사이즈 (브라우저 랜덤 좌표 구할 때 필요)
    const imgSize = useRef<number>(50);
    // 하트 이미지 wrapper DOM
    const container = useRef<HTMLDivElement>(null);
    // 하트 이미지 갯수
    const imgCount = useRef<number>(9);
    // 4초에 한번 렌더링
    const intervalTime = useRef<number>(4000);

    /**
     * --- 랜덤 하트 이미지 logic ---
     * 첫 렌더링에 랜덤으로 9개 배정
     * 4초 주기로 애들 위치 바꿔주기
     * state, props 없이 애초에 처음에 setinterval 해주면 될 듯???
     * 하트 이미지 참조는 어떻게 할 지??
     * -> 하트 이미지 참조 안해도 되고 위치만 state로 관리하면 될 듯???
     */

    useEffect(() => {
        setInterval(() => {
            
        }, intervalTime.current);
    }, [])


    function changeCoordinates(): void {
        console.log('위치 바뀜!');
    }

    function createHeartImage(): void {
        container.current?.classList.remove('showAnim');
        container.current?.classList.add('showAnim');
        const heartImages =
            <>
                {getOrderedArray(imgCount.current).map((key) => (
                    <Heart width={imgSize.current}
                        left={getRandomCoordinate().x}
                        top={getRandomCoordinate().y}
                        key={key} />
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
        <div ref={container} className='heart_image_wrap'>
            <button onClick={() => {
                console.log(!container.current?.classList.contains('showAnim'));
                container.current?.classList.toggle('showAnim',
                    !container.current?.classList.contains('showAnim'))
            }}>click me</button>
            <Heart width={imgSize.current}
                left={getRandomCoordinate().x}
                top={getRandomCoordinate().y}
                />
        </div>
    )
}

export default RandomHeart
