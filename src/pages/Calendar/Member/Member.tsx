import React, {ReactElement} from 'react';
import './style.scss';
import Label, {LabelType} from '../../../components/Label/Label';

const Member = (): ReactElement => {
  return (
    <section className="section_member">
      <div className='member_container'>
        {/* myLabelContainer로 필요한 css 속성 적용 (margin-top) */}
        <div className = 'myLabelContainer'><Label labelType={LabelType.MEMBER_SELF}/></div>
        <Label labelType={LabelType.MEMBER_PARTNER}/>
      </div>
    </section>
  );
}

export default Member;