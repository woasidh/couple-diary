import React from 'react';
import HeartImgSrc from '../../../resource/images/heart.png';

interface HeartProps {
    width: number
    left: number
    top: number
}

const Heart = (props: HeartProps) => (
    <img
        className="a"
        src={HeartImgSrc}
        width={props.width}
        style={{
            left: props.left,
            top: props.top
        }} />
)

export default Heart;