import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux_module';

const Member = (): ReactElement => {

  const userData = useSelector((state: RootState) => state.user);
  const coupleData = useSelector((state: RootState) => state.couple);

  const getFirstName = (koreanName: string): string => {
    return koreanName.charAt(0);
  }

  return (
    <div className = 'member_container'>
      {!!userData && !!coupleData && (
        <>
          <div className = 'member1'>{getFirstName(userData.name)}</div>
          <div className = 'member2'>{getFirstName(coupleData.partnerName)}</div>
        </>
      )}
    </div>
  );
}

export default Member;