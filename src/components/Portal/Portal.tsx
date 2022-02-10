import {ReactElement, ReactNode} from 'react';
import ReactDOM from 'react-dom';

const Portal = ({children}: {children: ReactNode}): ReactElement => {
  return (
    ReactDOM.createPortal(children, document.querySelector('.popup') as Element)
  )
}

export default Portal;