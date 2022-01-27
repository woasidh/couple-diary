import React, {ReactElement, ReactNode, useEffect, useRef, useState} from 'react';
import './style.scss';
import {DatePicker, Space, TimePicker, Radio} from 'antd';
import ClockImg from '../../../resource/images/clock.png';
import MemoImg from '../../../resource/images/notebook.png';
import CalendarImg from '../../../resource/images/calendar.png';
import CategoryImg from '../../../resource/images/category.png';
import TitleImg from '../../../resource/images/title.png';
import {CalendarEventData, CalendarEventType} from '../../../redux_module/CalendarEvent';
import ReactDOM from 'react-dom';
import ValidImg from '../../../resource/images/check.png';
import InvalidImg from '../../../resource/images/delete.png';

interface EventAddPopupProps {
  onClickCloseBtn: (e: any) => void;
  onClickSubmitBtn: (date: string, data: CalendarEventData) => void;
}

const EventAddPopup = (props: EventAddPopupProps): ReactElement => {

  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<Array<string> | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [eventType, setEventType] = useState<CalendarEventType | null>(null);

  const closePopup = (): void => {
    ReactDOM.unmountComponentAtNode(document.getElementById('popup') as HTMLElement);
  }

  const onClickSubmitBtn = (_: any): void => {
    // todo type, name 필수처리 하기
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
    // todo(done) css classname 리팩토링 하기
    <div className='popupContainer' id='eventAdd' onClick={(e): void => {e.stopPropagation();}}>
      <ContentRowWrapper leftImgSrc={TitleImg} isDataValid={!!title}>
        <input type='text' className='titleInput' placeholder='제목' onChange={(e: any): void => setTitle(e.target.value)}/>
      </ContentRowWrapper>
      <ContentRowWrapper leftImgSrc={CalendarImg} isDataValid={!!date}>
        <DateContent useDate= {(date): any => setDate(date)}/>
      </ContentRowWrapper>
      <ContentRowWrapper leftImgSrc={ClockImg} isDataValid={true}>
        <TimeContent useTime = {(time): any => setTime(time)}/>
      </ContentRowWrapper>
      <ContentRowWrapper leftImgSrc={MemoImg} isDataValid={true}>
        <MemoContent useMemo={(memo): any => setMemo(memo)}/>
      </ContentRowWrapper>
      <ContentRowWrapper leftImgSrc={CategoryImg} isDataValid={!!eventType}>
        <EventTypeContent useEventType={(eventType): any => setEventType(eventType)}/>
      </ContentRowWrapper>
      <button className='eventAddPopupBottomBtn' id = 'submit'onClick={onClickSubmitBtn}>저장</button>
      <button className='eventAddPopupBottomBtn' id = 'close' onClick={props.onClickCloseBtn}>닫기</button>
    </div>
  )
}

/**
 * 날짜 컨텐트
 */
interface ContentRowWrapperProps {
  leftImgSrc: string;
  children: ReactNode;
  isDataValid: boolean;
}
const ContentRowWrapper = (props: ContentRowWrapperProps): ReactElement => {

  const validDOMRef = useRef<HTMLImageElement | null>(null);
  const inValidDOMRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (validDOMRef.current && inValidDOMRef.current) {
      if (props.isDataValid) {
        validDOMRef.current.style.visibility = 'visible';
        validDOMRef.current.style.transform = 'translateY(0)';
        inValidDOMRef.current.style.visibility = 'hidden';
        inValidDOMRef.current.style.transform = 'translateY(5px)';
      } else {
        inValidDOMRef.current.style.visibility = 'visible';
        inValidDOMRef.current.style.transform = 'translateY(0)';
        validDOMRef.current.style.visibility = 'hidden';
        validDOMRef.current.style.transform = 'translateY(5px)';
      }
    }
  }, [props.isDataValid]);

  return (
    <div className='eventContentRow'>
      {/* todo 이미지홀더까지 공통처리 하기 */}
      {props.leftImgSrc && <div className='eventContentImgHolder'><img src={props.leftImgSrc} width={20} alt='시간아이콘'/></div>}
      {props.children}
      <div className = 'dataStateWrapper'>
        <img className = 'dataState' src = {ValidImg} width = {15} ref = {validDOMRef}/>
        <img className = 'dataState' src = {InvalidImg} width = {15} ref = {inValidDOMRef}/>
      </div>
    </div>
  );
}

interface DateContentProps {

  useDate: (date: string) => any;
}
const DateContent = ({useDate}: DateContentProps): ReactElement => {
  return (
    <>
      <Space>
        <DatePicker
          style={{width: '200px'}}
          placeholder='날짜를 입력해주세요'
          onChange = {(_: any, dateStr: string): void => useDate(dateStr)}
        />
      </Space>
    </>
  );
}

/**
 * 시간 컨텐트
 */
interface TimeContentProps {
  useTime: (time: Array<string>) => any;
}
const TimeContent = ({useTime}: TimeContentProps): ReactElement => {
  return (
    <>
      <TimePicker.RangePicker
        format='HH:00:00'
        placeholder={['시작 시간', '종료 시간']}
        onChange={(_: any, timeArr: Array<string>): void => {useTime(timeArr);}}
      />
    </>
  );
}

/**
 * 메모 컨텐트
 */
interface MmeoContentProps {
  useMemo: (memo: string) => any;
}
const MemoContent = ({useMemo}: MmeoContentProps): ReactElement => {
  return (
    <>
      <textarea className='memoInput' onChange={(e: any): void => useMemo(e.target.value)}/>
    </>
  );
}

/**
 * 이벤트 타입 컨텐트
 */
interface EventTypeContentProps {
  useEventType: (eventType: CalendarEventType) => any;
}
const EventTypeContent = ({useEventType}: EventTypeContentProps): ReactElement => {
  return (
    <>
      <Radio.Group defaultValue="a" size="large" onChange={(e: any): void => useEventType(e.target.value)}>
        <Radio.Button value={CalendarEventType.COUPLE}>커플일정</Radio.Button>
        <Radio.Button value={CalendarEventType.PERSONAL}>개인일정</Radio.Button>
      </Radio.Group>
    </>
  );
}

export default EventAddPopup;