import {ReactElement, useRef} from 'react';
import './Editor.scss';
import Controller from './Controller/Controller';

const Editor = (): ReactElement => {

  const contentRef = useRef<HTMLDivElement | null>(null);

  const onClickBold = (): void => {
    document.execCommand('bold');
    contentRef.current?.focus();
  }

  return (
    <div className='EditorWrapper'>
      <Controller/>
      <button onClick = {onClickBold}>bold</button>
      <div className = 'textArea' contentEditable ref={contentRef}/>
    </div>
  )
}

export default Editor;