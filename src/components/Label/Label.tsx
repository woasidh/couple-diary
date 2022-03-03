import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {StringUtil} from '../../shared/util/StringUtil';
import './Label.scss';

export enum LabelType {
  EVENT_HOLIDAY,
  MEMBER_SELF,
  MEMBER_PARTNER
}

export enum LabelSize {
  SMALL,
  LARGE
}

interface LabelProps {
  labelType: LabelType;
  size: LabelSize
}

const Label = (props: LabelProps): ReactElement => {

  const userData = useSelector((state: RootState) => state.user);
  const coupleData = useSelector((state: RootState) => state.couple);

  const getId = (): string => {
    if (props.labelType === LabelType.EVENT_HOLIDAY) return '';
    else return props.labelType === LabelType.MEMBER_SELF ? 'self' : 'partner';
  }

  const getContent = (): string => {
    switch (props.labelType) {
      case LabelType.MEMBER_SELF:
        return userData ? StringUtil.getFirstKoreanName(userData.name) : '';
      case LabelType.MEMBER_PARTNER:
        return coupleData ? StringUtil.getFirstKoreanName(coupleData.partnerName) : '';
      case LabelType.EVENT_HOLIDAY:
        return '공';
      default:
        // eslint-disable-next-line no-console
        console.error('invalid labelType');
        return '';
    }
  }

// todo Label 컴포넌트 통합해서 props로 처리하는건 어떤지?
  return (
    <div
      className={props.labelType === LabelType.EVENT_HOLIDAY ? 'holidayLabel' : 'memberLabel'}
      id={getId()}
      style = {{
        width : props.size === LabelSize.SMALL ? '35px' : '50px',
        height : props.size === LabelSize.SMALL ? '35px' : '50px',
        fontSize : props.size === LabelSize.SMALL ? '12px' : '14px',
      }}>
      {getContent()}
    </div>
  )
}

Label.defaultProps = {
  size: LabelSize.LARGE
}

export default Label;