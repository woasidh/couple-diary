import React, { ReactElement } from 'react';

export enum PasswordStatus {
    UNKNOWN,
    WRONG
}

interface PasswordInputProps {
    inputStatus: PasswordStatus;
    onChangeContent: (e: string) => void;
    value: string;
}

const PasswordInput = (props: PasswordInputProps): ReactElement => {

  function onContentChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const content = e.currentTarget.value;
    props.onChangeContent(content);
  }

  return (
    <div className="login_input">
      <label htmlFor = 'password_input' className="input_title">비밀번호</label>
      <input onChange={onContentChange} type='password' id='password_input' value={props.value} />
      <span className="input_result_info">{props.inputStatus === PasswordStatus.WRONG && '비밀번호가 일치하지 않습니다'}</span>
    </div>
  );
};

export default PasswordInput;
