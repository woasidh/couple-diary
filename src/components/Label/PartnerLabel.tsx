import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux_module';
import {StringUtil} from '../../util/StringUtil';

const PartnerLabel = (): ReactElement => {

  const coupleData = useSelector((state: RootState) => state.couple);

  return (
    <>
      {coupleData && <div className='memberLabel' id='partner'>{StringUtil.getFirstKoreanName(coupleData.partnerName)}</div>}
    </>
  )
}

export default PartnerLabel;