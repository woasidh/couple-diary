import React from 'react';
import './LogoHeader.scss';

interface LogoHeaderProps {
    imageUrl: string
    text: string
}

const LogoHeader = (props: LogoHeaderProps) => {
    return (
        <div className = "logo_header">
            <img src = {props.imageUrl} alt = "logo"/>
            <div>{props.text}</div>
        </div>
    );
}

export default LogoHeader;