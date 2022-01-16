import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux_module';
import {StringUtil} from '../../util/StringUtil';
import './Label.scss';

export enum LabelType {
  EVENT_HOLIDAY,
  MEMBER_SELF,
  MEMBER_PARTNER
}

interface LabelProps {
  labelType: LabelType;
}

const Label = (props: LabelProps): ReactElement => {

  const userData = useSelector((state: RootState) => state.user);
  const coupleData = useSelector((state: RootState) => state.couple);

  const renderElement = (): ReactElement => {
    switch (props.labelType) {
      case LabelType.MEMBER_SELF:
        return <div className='memberLabel' id='self'>{getContent()}</div>;
      case LabelType.MEMBER_PARTNER:
        return <div className='memberLabel' id='partner'>{getContent()}</div>
      case LabelType.EVENT_HOLIDAY:
        return <div className='holidayLabel'>{getContent()}</div>
      default:
        console.error('invalid labelType');
        return <></>;
    }
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
        console.error('invalid labelType');
        return '';
    }
  }

  // todo Label 컴포넌트 통합해서 props로 처리하는건 어떤지?
  return renderElement();
}

export default Label;