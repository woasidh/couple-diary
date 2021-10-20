import React, { ReactElement } from 'react';
import './LogoHeader.scss';

interface LogoHeaderProps {
    imageUrl: string
    text: string
}

const LogoHeader = (props: LogoHeaderProps): ReactElement => (
  <div className="logo_header">
    <div>{props.text}</div>
  </div>
);

export default LogoHeader;
