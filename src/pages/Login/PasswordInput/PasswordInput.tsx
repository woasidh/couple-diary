import React, { ReactElement } from 'react';

export enum PasswordStatus {
    UNKNOWN,
    WRONG
}

interface PasswordInputProps {
    type: string
    text: string
    inputStatus: PasswordStatus
    onChangeContent: (e: string) => void
}

const PasswordInput = (props: PasswordInputProps): ReactElement => {

  function onContentChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const content = e.currentTarget.value;
    props.onChangeContent(content);
  }

  return (
    <div className="login_input">
      <label htmlFor = 'password_input' className="input_title">{props.text}</label>
      <input onChange={onContentChange} type={props.type} id='password_input' />
      <span className="input_result_info">{props.inputStatus === PasswordStatus.WRONG && '비밀번호가 일치하지 않습니다'}</span>
    </div>
  );
};

export default PasswordInput;
