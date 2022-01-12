import React, {ReactElement} from 'react';
import './style.scss';
import {DatePicker, Space} from 'antd';
import ClockImg from '../../../resource/images/clock.png';
import MemoImg from '../../../resource/images/notebook.png';

const EventAddPopup = (): ReactElement => {
  return (
    // todo css className 중복 처리 어떻게 해결할까
    <div className='popupContainer'
         id='eventAdd'
         onClick={(e): void => {
           e.stopPropagation();
         }}>
      <input type='text' className = 'titleInput' placeholder='제목'/>
      <div className='datePicker'>
        <div className='imgHolder'><img src={ClockImg} width={20}/></div>
        <Space>
          <DatePicker
            style={{
              width: '200px'
            }}
            placeholder='날짜를 입력해주세요'
          />
        </Space>
      </div>
      <div className='memoContainer'>
        <div className='imgHolder'><img src={MemoImg} width={20}/></div>
        <input type = 'text' className = 'memoInput'/>
      </div>
    </div>
  )
}

export default EventAddPopup;