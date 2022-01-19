import React, {ReactElement} from 'react';
import './style.scss';
import {DatePicker, Space, TimePicker} from 'antd';
import ClockImg from '../../../resource/images/clock.png';
import MemoImg from '../../../resource/images/notebook.png';
import CalendarImg from '../../../resource/images/calendar.png';

interface EventAddPopupProps {
  closePopup: (e: any) => void;
}

const EventAddPopup = (props: EventAddPopupProps): ReactElement => {
  return (
    // todo css className 중복 처리 어떻게 해결할까
    <div className='popupContainer'
         id='eventAdd'
         onClick={(e): void => {
           e.stopPropagation();
         }}>
      <input type='text' className='titleInput' placeholder='제목'/>
      <div className='datePicker'>
        <div className='imgHolder'><img src={CalendarImg} width={20} alt='시간아이콘'/></div>
        <Space>
          <DatePicker
            style={{
              width: '200px'
            }}
            placeholder='날짜를 입력해주세요'
          />
        </Space>
      </div>
      <div className='datePicker'>
        <div className='imgHolder'><img src={ClockImg} width={20} alt='시간아이콘'/></div>
        <TimePicker.RangePicker
          format='HH:00:00'
          placeholder={['시작 시간', '종료 시간']}/>
      </div>
      <div className='memoContainer'>
        <div className='imgHolder'><img src={MemoImg} width={20} alt='메모아이콘'/></div>
        <textarea className='memoInput' />
      </div>
      <button className='submit'>저장</button>
      <button className='close' onClick={props.closePopup}>닫기</button>
    </div>
  )
}

export default EventAddPopup;