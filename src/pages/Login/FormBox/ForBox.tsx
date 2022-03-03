import React, {ReactElement, ReactNode} from 'react';
import './FormBox.scss';

interface FormBoxProps {
  title: string;
  children: ReactNode;
}

const FormBox = (props: FormBoxProps): ReactElement => {
  return (
    <div className="form_box">
      <div className="form_content_wrapper">
        <div className="form_header">{props.title}</div>
        {props.children}
      </div>
    </div>
  );
}

export default FormBox;