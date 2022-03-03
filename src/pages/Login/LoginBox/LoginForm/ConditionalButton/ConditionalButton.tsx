import React, {ReactElement} from 'react';
import './ConditionalButto.scss';
import variables from '../../../../../variables';

/**
 * props에 따라 clickable / unclickable
 * @props isClickable, children
 */

interface ConditionalButtonProps {
  onClick: () => any;
  isClickable: boolean;
  content: string;
}

const onColor = variables.colors.primaryPink;
const offColor = variables.colors.backgroundGray;

const ConditionalButton = (props: ConditionalButtonProps): ReactElement => {
  return (
    <>
      <button
        className = 'condition_button'
        onClick={props.onClick}
        disabled={!props.isClickable}
        style={{backgroundColor: props.isClickable ? onColor : offColor}}>
        {props.content}
      </button>
    </>
  )
}

export default ConditionalButton;