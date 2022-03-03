import React, {ReactElement} from 'react';
import './Input.scss';
import {StringUtil} from '../../../../../shared/util/StringUtil';

export interface EmailInputStatus {
  isValid: boolean
  inputStateMsg: string
}

interface EmailInputProps {
  inputStatus: EmailInputStatus;
  onChangeContent: (e: string, isValidEmail: boolean) => void;
  value: string;
}

const EmailInput = (props: EmailInputProps): ReactElement => {
  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const content = e.currentTarget.value;
    props.onChangeContent(content, StringUtil.checkIfValidEmail(content));
  }
  return (
    <div className="login_input">
      <label htmlFor='email_input' className="input_title">이메일</label>
      <input onChange={onContentChange} value={props.value} type='email' id='email_input'/>
      <span
        data-testid='email_status'
        className="input_result_info"
        style={{
          color: props.inputStatus.isValid ? '#1dd38a' : '#FE4A49',
        }}
      >
        {props.inputStatus.inputStateMsg}
      </span>
    </div>
  );
};

export default EmailInput;
