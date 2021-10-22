import React, { ReactElement } from 'react';
import HeartImgSrc from '../../../resource/images/heart.png';

interface HeartProps {
    width: number
    left: number
    top: number
}

const Heart = (props: HeartProps): ReactElement => (
  <img
    className="a"
    src={HeartImgSrc}
    width={props.width}
    style={{
      left: props.left,
      top: props.top,
    }}
    alt="heartImg"
  />
);

export default Heart;
