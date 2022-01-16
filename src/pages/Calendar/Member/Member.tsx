import React, {ReactElement} from 'react';
import './style.scss';
import MyLabel from '../../../components/MemberLabel/MemberLabel/MyLabel';
import PartnerLabel from '../../../components/MemberLabel/MemberLabel/PartnerLabel';

const Member = (): ReactElement => {
  return (
    <section className="section_member">
      <div className='member_container'>
        {/* myLabelContainer로 필요한 css 속성 적용 (margin-top) */}
        <div className = 'myLabelContainer'><MyLabel/></div>
        <PartnerLabel/>
      </div>
    </section>
  );
}

export default Member;