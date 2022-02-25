import React, {ReactElement} from 'react';

/**
 * props에 따라 clickable / unclickable
 * @props isClickable, children
 */

interface ConditionalButtonProps {
  onClick: () => any;
  isClickable: boolean;
  onColor: string;
  offColor: string;
  content: string;
}

const ConditionalButton = (props: ConditionalButtonProps): ReactElement => {
  return (
    <>
      <button onClick={props.onClick}
              disabled={!props.isClickable}
              style={{backgroundColor: props.isClickable ? props.onColor : props.offColor}}>
        {props.content}
      </button>
    </>
  )
}

export default ConditionalButton;