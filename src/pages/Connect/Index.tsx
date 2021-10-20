import React, { ReactElement } from 'react';
import ConnectionContent from './ConnectionContent/ConnectionContent';
import './Index.scss';
import RandomHeart from './RandomHeart/RandomHeart';

const Connect = (): ReactElement => (
  <div className="connect_root">
    <RandomHeart
      intervalTime={4000}
      imgSize={40}
      imgCount={9}
    />
    <ConnectionContent />
  </div>
);

export default Connect;
