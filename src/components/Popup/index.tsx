import React, {ReactElement} from 'react'
import './style.scss'

interface PopupBackgroundProps {
  onBackgroundClick: (e: any) => void;
  children: React.ReactNode
}

const PopupBackground = (props: PopupBackgroundProps): ReactElement => {
  return (
    <div className = 'popupBackground' onClick = {props.onBackgroundClick}>
      {props.children}
    </div>
  )
}

export default PopupBackground;