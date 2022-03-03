import React, {ReactElement} from 'react';
import './NameInput.scss';

interface NameInputProps {
  onChangeContent: (content: string) => void;
  value: string;
}

const NameInput = (props: NameInputProps): ReactElement => {
  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const content = e.currentTarget.value;
    props.onChangeContent(content);
  }
  return (
    <div className="nameInput_wrapper">
      <label htmlFor='name_input' className="input_label">이름</label>
      <input onChange={onContentChange} value={props.value} type='text' id='name_input'/>
    </div>
  );
};

export default NameInput;
