import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux_module';
import {StringUtil} from '../../util/StringUtil';
import './Label.scss';

const MyLabel = (): ReactElement => {

  const userData = useSelector((state: RootState) => state.user);

  return (
    <>
      {userData && <div className='memberLabel' id='self'>{StringUtil.getFirstKoreanName(userData.name)}</div>}
    </>
  )
}

export default MyLabel;