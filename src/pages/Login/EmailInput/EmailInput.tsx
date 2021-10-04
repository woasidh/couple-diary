import React, {ReactElement, useState} from 'react';
import './Input.scss';

interface InputProps {
    type: string
    text: string
    inputMsgRef: React.Ref<HTMLSpanElement>
    onChangeContent: (e: string, isValidEmail: boolean) => void
}

const EmailInput = (props: InputProps): ReactElement => {

    const [isValidEmail, setIsValidEmail] = useState(false);

    function onContentChange(e: React.ChangeEvent<HTMLInputElement>) {
        const content = e.currentTarget.value;
        props.onChangeContent(content, checkIfValidEmail(content));
    }

    function checkIfValidEmail(content: string): boolean {
        // http://emailregex.com에서 가져온 email regex
        const regex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])";
        const result = !!content.match(regex);
        console.log(result);
        setIsValidEmail(result);
        return result;
    }

    return (
        <div className = "login_input">
            <span className = "input_title">{props.text}</span>
            <input onChange={ onContentChange } type = {props.type}/>
            <span ref = {props.inputMsgRef} className = "input_result_info" style = {{
                color: isValidEmail? '#1dd38a' : '#FE4A49'
            }}>{isValidEmail ?  '올바른 이메일 형식입니다' : '@를 포함한 이메일 주소를 입력해주세요'}</span>
        </div>
    );
}

export default EmailInput;
