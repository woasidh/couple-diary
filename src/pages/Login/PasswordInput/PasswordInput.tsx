import React, {ReactElement} from 'react';

interface InputProps {
    type: string
    text: string
    onChangeContent: (e: string) => void
}

const PasswordInput = (props: InputProps): ReactElement => {

    function onContentChange(e: React.ChangeEvent<HTMLInputElement>) {
        const content = e.currentTarget.value;
        props.onChangeContent(content);
    }

    return (
        <div className = "login_input">
            <span className = "input_title">{props.text}</span>
            <input onChange={ onContentChange } type = {props.type}/>
        </div>
    );
}

export default PasswordInput;
