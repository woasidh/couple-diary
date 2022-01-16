import React, {ReactElement} from 'react';
import './style.scss';
import MyLabel from '../../../components/MemberLabel/MemberLabel/MyLabel';
import PartnerLabel from '../../../components/MemberLabel/MemberLabel/PartnerLabel';

const Member = (): ReactElement => {
  return (
    <section className="section_member">
      <div className='member_container'>
        <div className = 'myLabelContainer'><MyLabel/></div>
        <PartnerLabel/>
      </div>
    </section>
  );
}

export default Member;