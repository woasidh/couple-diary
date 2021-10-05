import React, {ReactElement} from 'react';

interface PasswordInputProps {
    type: string
    text: string
    inputStatus: PasswordStatus
    onChangeContent: (e: string) => void
}

const PasswordInput = (props: PasswordInputProps): ReactElement => {

    function onContentChange(e: React.ChangeEvent<HTMLInputElement>) {
        const content = e.currentTarget.value;
        props.onChangeContent(content);
    }

    return (
        <div className = "login_input">
            <span className = "input_title">{props.text}</span>
            <input onChange={ onContentChange } type = {props.type}/>
            <span className = "input_result_info">{props.inputStatus === PasswordStatus.WRONG && '비밀번호가 일치하지 않습니다'}</span>
        </div>
    );
}

export enum PasswordStatus {
    UNKNOWN,
    WRONG
}

export default PasswordInput;
