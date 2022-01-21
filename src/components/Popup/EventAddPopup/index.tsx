import React, {ReactElement, useState} from 'react';
import './style.scss';
import {DatePicker, Space, TimePicker, Radio} from 'antd';
import ClockImg from '../../../resource/images/clock.png';
import MemoImg from '../../../resource/images/notebook.png';
import CalendarImg from '../../../resource/images/calendar.png';
import CategoryImg from '../../../resource/images/category.png';
import {CalendarEventData, CalendarEventType} from '../../../redux_module/CalendarEvent';
import ReactDOM from 'react-dom';

interface EventAddPopupProps {
  onClickCloseBtn: (e: any) => void;
  onClickSubmitBtn: (date: string, data: CalendarEventData) => void;
}

const EventAddPopup = (props: EventAddPopupProps): ReactElement => {

  const [title, setTitle] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<Array<string> | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [eventType, setEventType] = useState<CalendarEventType | null>(null);

  const closePopup = (): void => {
    ReactDOM.unmountComponentAtNode(document.getElementById('popup') as HTMLElement);
  }

  const onClickSubmitBtn = (_: any): void => {
    const eventData = {
      type: eventType as CalendarEventType,
      name: title as string,
      time: time,
      memo: memo,
    }
    props.onClickSubmitBtn(date as string, eventData);
    closePopup();
  }

  return (
    // todo css className 중복 처리 어떻게 해결할까
    // todo img -> svg로 hover시 바꿔보기
    // todo component화 하자 - 너무 복잡함
    // todo css classname 리팩토링 하기
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
            onChange = {(_: any, dateStr: string): void => setDate(dateStr)}
          />
        </Space>
      </div>
      <div className='datePicker'>
        <div className='imgHolder'><img src={ClockImg} width={20} alt='시간아이콘'/></div>
        <TimePicker.RangePicker
          format='HH:00:00'
          placeholder={['시작 시간', '종료 시간']}
          onChange={(_: any, timeArr: Array<string>): void => {setTime(timeArr);}}
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
      <button className='close' onClick={props.onClickCloseBtn}>닫기</button>
    </div>
  )
}

export default EventAddPopup;