import React, { useRef, useState, useEffect, ReactElement } from 'react'
import {ArrayUtil} from '../../../util/ArrayUtil';
import { Point } from '../../../util/Point';
import Heart from './Heart';
import './RandomHeart.scss';

/*
    * --- 랜덤 하트 이미지 logic ---
    * 첫 렌더링에 랜덤으로 9개 배정
    * 4초 주기로 애들 위치 바꿔주기
    * state, props 없이 애초에 처음에 setinterval 해주면 될 듯???
    * 하트 이미지 참조는 어떻게 할 지??
    * -> 하트 이미지 참조 안해도 되고 위치만 state로 관리하면 될 듯???
*/
const RandomHeart = () => {

    // 하트 이미지 사이즈 (브라우저 랜덤 좌표 구할 때 필요)
    const imgSize = useRef<number>(40);
    // 하트 이미지 wrapper DOM
    const container = useRef<HTMLDivElement>(null);
    // 하트 이미지 갯수
    const imgCount = useRef<number>(9);
    // 4초에 한번 렌더링
    const intervalTime = useRef<number>(4000);
    
    // 하트 좌표 배열
    // setInterval로 4초마다 업데이트
    const [coordinates, setCoordinates] = useState<Array<Point>>([]);

    useEffect(() => {
        // TODO 옮기긴했는데 흠,,, 알아보기
        // 좌표 배열 정보 바꾸기
        function setCoordinateRandomly(): void {
            const coordinateArray = [];
            for (let i = 0; i < imgCount.current; i++) {
                coordinateArray.push(getRandomCoordinate(i));
            }
            setCoordinates(coordinateArray);
        }

        setCoordinateRandomly();
        setInterval(() => {
            setCoordinateRandomly();
        }, intervalTime.current);
    }, [])

    function getRandomCoordinate(section: number): Point {

        const unit = Math.sqrt(imgCount.current);
        const top = Math.floor(section / unit);
        const left = section % unit;

        // TODO useref 유효성 체크 어떻게 해야 하는건지...?
        if (container.current) {

            const rowUnit = (container.current?.getBoundingClientRect().width) / unit;
            const columnUnit = (container.current?.getBoundingClientRect().height) / unit;

            return ({
                x: (rowUnit * left) + (Math.random() * (rowUnit - imgSize.current)),
                y: (columnUnit * top) + (Math.random() * (columnUnit - imgSize.current)),
            });
        }
        return ({
            x: 0,
            y: 0
        })
    }

    function renderHearts(): Array<ReactElement> {
        return ArrayUtil.getOrderedArray(imgCount.current).map(key => (
            <Heart width={imgSize.current} left={coordinates[key].x} top={coordinates[key].y} key={key} />
        ));
    }

    return (
        <div ref={container} className='heart_image_wrap'>
            {coordinates.length > 0 && renderHearts()}
        </div>
    )
}

export default RandomHeart
