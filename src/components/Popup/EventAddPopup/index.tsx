import React, {ReactElement, useState} from 'react';
import './style.scss';
import {DatePicker, Space, TimePicker, Radio} from 'antd';
import ClockImg from '../../../resource/images/clock.png';
import MemoImg from '../../../resource/images/notebook.png';
import CalendarImg from '../../../resource/images/calendar.png';
import CategoryImg from '../../../resource/images/category.png';
import {useDispatch} from 'react-redux';
import {CalendarEventType} from '../../../redux_module/CalendarEvent';

interface EventAddPopupProps {
  onPopupClose: (e: any) => void;
}

const EventAddPopup = (props: EventAddPopupProps): ReactElement => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<Array<string> | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [eventType, setEventType] = useState<CalendarEventType | null>(null);

  const onChangeTime = (_: any, timeArr: Array<string>): void => {
    const timeRange = [timeArr[0].split(':')[0], timeArr[1].split(':')[0]];
    setTime(timeRange);
  }

  const onClickSubmitBtn = (_: any): void => {
    console.log(title, date, time, memo, eventType);
  }

  return (
    // todo css className 중복 처리 어떻게 해결할까
    // todo img -> svg로 hover시 바꿔보기
    // todo component화 하자 - 너무 복잡함
    <div className='popupContainer'
         id='eventAdd'
         onClick={(e): void => {
           e.stopPropagation();
         }}>
      <input type='text' className='titleInput' placeholder='제목' onChange={(e: any): void => setTitle(e.target.value)}/>
      <div className='datePicker'>
        <div className='imgHolder'><img src={CalendarImg} width={20} alt='달력아이콘'/></div>
        <Space>
          <DatePicker
            style={{
              width: '200px'
            }}
            placeholder='날짜를 입력해주세요'
            onChange = {(_: any, dateStr: string): void => setDate(dateStr.split('-').join(''))}
          />
        </Space>
      </div>
      <div className='datePicker'>
        <div className='imgHolder'><img src={ClockImg} width={20} alt='시간아이콘'/></div>
        <TimePicker.RangePicker
          format='HH:00:00'
          placeholder={['시작 시간', '종료 시간']}
          onChange={(_: any, timeArr: Array<string>): void => {
            const timeRange = [timeArr[0].split(':')[0], timeArr[1].split(':')[0]];
            setTime(timeRange);
          }}
        />
      </div>
      <div className='memoContainer'>
        <div className='imgHolder'><img src={MemoImg} width={20} alt='메모아이콘'/></div>
        <textarea className='memoInput' onChange={(e: any): void => setMemo(e.target.value)}/>
      </div>
      <div className='memoContainer'>
        <div className='imgHolder'><img src={CategoryImg} width={20} alt='카테고리아이콘'/></div>
        <Radio.Group defaultValue="a" size="large" onChange={(e: any): void => setEventType(e.target.value)}>
          <Radio.Button value={CalendarEventType.COUPLE}>커플일정</Radio.Button>
          <Radio.Button value={CalendarEventType.PERSONAL}>개인일정</Radio.Button>
        </Radio.Group>
      </div>
      <button className='submit' onClick={onClickSubmitBtn}>저장</button>
      <button className='close' onClick={props.onPopupClose}>닫기</button>
    </div>
  )
}

export default EventAddPopup;