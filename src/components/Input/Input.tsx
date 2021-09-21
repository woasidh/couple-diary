import React, {ReactElement} from 'react';
import './Input.scss';

interface InputProps {
    type: string
    text: string
    onChangeContent: (e: string) => void
}

const Input = (props: InputProps): ReactElement => {

    function onContentChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.onChangeContent(e.currentTarget.value);
    }

    return (
        <div className = "input">
            <span>{props.text}</span>
            <input onChange={ onContentChange } type = {props.type}/>
        </div>
    );
}

export default Input;
