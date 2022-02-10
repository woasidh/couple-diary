import React, {ReactElement} from 'react'
import './style.scss'

interface PopupBackgroundProps {
  isActivated: boolean;
  onBackgroundClick: (e: any) => void;
  children: React.ReactNode
}

const PopupBackground = (props: PopupBackgroundProps): ReactElement => {
  return (
    <div className='popupBackground'
         onClick={props.onBackgroundClick}
          style = {{
            visibility: props.isActivated ? 'visible' : 'hidden'
          }}>
      {props.children}
    </div>
  )
}

PopupBackground.defaultProps = {
  isActivated: true
}

export default PopupBackground;