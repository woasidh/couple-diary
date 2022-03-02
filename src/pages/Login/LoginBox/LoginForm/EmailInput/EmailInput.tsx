import React, { ReactElement } from 'react';
import './Input.scss';
import {StringUtil} from '../../../../../shared/util/StringUtil';

export interface EmailInputStatus {
    isValid: boolean
    inputStateMsg: string
}

interface EmailInputProps {
    type: string
    text: string
    inputStatus: EmailInputStatus
    onChangeContent: (e: string, isValidEmail: boolean) => void
}

const EmailInput = ({
  type, text, inputStatus, onChangeContent,
}: EmailInputProps): ReactElement => {
  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const content = e.currentTarget.value;
    onChangeContent(content, StringUtil.checkIfValidEmail(content));
  }
  return (
    <div className="login_input">
      <label htmlFor='email_input' className="input_title">{text}</label>
      <input onChange={onContentChange} type={type} id='email_input'/>
      <span
        data-testid = 'email_status'
        className="input_result_info"
        style={{
          color: inputStatus.isValid ? '#1dd38a' : '#FE4A49',
        }}
      >
        {inputStatus.inputStateMsg}
      </span>
    </div>
  );
};

export default EmailInput;
