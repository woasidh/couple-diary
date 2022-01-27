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
import moment from 'moment';

interface EventAddPopupProps {
  onClickCloseBtn: (e: any) => void;
  onClickSubmitBtn: (date: string, data: CalendarEventData) => void;
  data: CalendarEventData | null;
  date: string | null;
}

const EventAddPopup = (props: EventAddPopupProps): ReactElement => {

  const [title, setTitle] = useState<string>(props.data?.name ? props.data.name : '');
  const [date, setDate] = useState<string | null>(props.date ? props.date : null);
  const [time, setTime] = useState<Array<string> | null>(props.data?.time ? props.data.time : null);
  const [memo, setMemo] = useState<string | null>(props.data?.memo ? props.data.memo : null);
  const [eventType, setEventType] = useState<CalendarEventType | null>(props.data?.type ? props.data.type : null);

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

  const isSubmitBtnAvailable = (): boolean => {
    return !!title && !!date && !!eventType;
  }

  return (
    // todo css className 중복 처리 어떻게 해결할까
    // todo img -> svg로 hover시 바꿔보기
    // todo component화 하자 - 너무 복잡함
    // todo(done) css classname 리팩토링 하기
    <div className='popupContainer' id='eventAdd' onClick={(e): void => {
      e.stopPropagation();
    }}>
      <ContentRowWrapper leftImgSrc={TitleImg} isDataValid={!!title}>
        <input type='text'
               className='titleInput'
               placeholder='제목'
               onChange={(e: any): void => setTitle(e.target.value)}
               value={title}/>
      </ContentRowWrapper>
      <ContentRowWrapper leftImgSrc={CalendarImg} isDataValid={!!date}>
        <DateContent useDate={(date): any => setDate(date)} date={date}/>
      </ContentRowWrapper>
      <ContentRowWrapper leftImgSrc={ClockImg} isDataValid={true}>
        <TimeContent useTime={(time): any => setTime(time)} time={time}/>
      </ContentRowWrapper>
      <ContentRowWrapper leftImgSrc={MemoImg} isDataValid={true}>
        <MemoContent useMemo={(memo): any => setMemo(memo)} memo={memo}/>
      </ContentRowWrapper>
      <ContentRowWrapper leftImgSrc={CategoryImg} isDataValid={!!eventType}>
        <EventTypeContent useEventType={(eventType): any => setEventType(eventType)} eventType={eventType}/>
      </ContentRowWrapper>
      <button className={`eventAddPopupBottomBtn ${isSubmitBtnAvailable() ? '' : 'disable'}`} id='submit'
              disabled={!isSubmitBtnAvailable()} onClick={onClickSubmitBtn}>저장
      </button>
      <button className='eventAddPopupBottomBtn' id='close' onClick={props.onClickCloseBtn}>닫기</button>
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
      {props.leftImgSrc &&
      <div className='eventContentImgHolder'><img src={props.leftImgSrc} width={20} alt='시간아이콘'/></div>}
      {props.children}
      <div className='dataStateWrapper'>
        <img className='dataState' src={ValidImg} width={15} ref={validDOMRef}/>
        <img className='dataState' src={InvalidImg} width={15} ref={inValidDOMRef}/>
      </div>
    </div>
  );
}

interface DateContentProps {
  useDate: (date: string) => any;
  date: string | null;
}

const DateContent = ({useDate, date}: DateContentProps): ReactElement => {
  return (
    <>
      <Space>
        <DatePicker
          style={{width: '200px'}}
          placeholder='날짜를 입력해주세요'
          onChange={(_: any, dateStr: string): void => useDate(dateStr)}
          value={date ? moment(date, 'YYYY-MM-DD') : undefined}
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
  time: Array<string> | null
}

const TimeContent = ({useTime, time}: TimeContentProps): ReactElement => {
  return (
    <>
      <TimePicker.RangePicker
        format='HH:00:00'
        placeholder={['시작 시간', '종료 시간']}
        onChange={(_: any, timeArr: Array<string>): void => {
          useTime(timeArr);
        }}
        value={time ? [moment(time[0], 'HH:mm:ss'), moment(time[1], 'HH:mm:ss')] : undefined}
      />
    </>
  );
}

/**
 * 메모 컨텐트
 */
interface MmeoContentProps {
  useMemo: (memo: string) => any;
  memo: string | null;
}

const MemoContent = ({useMemo, memo}: MmeoContentProps): ReactElement => {
  return (
    <>
      <textarea className='memoInput'
                onChange={(e: any): void => useMemo(e.target.value)}
                value={memo ? memo : undefined}/>
    </>
  );
}

/**
 * 이벤트 타입 컨텐트
 */
interface EventTypeContentProps {
  useEventType: (eventType: CalendarEventType) => any;
  eventType: CalendarEventType | null;
}

const EventTypeContent = ({useEventType, eventType}: EventTypeContentProps): ReactElement => {
  return (
    <>
      <Radio.Group defaultValue= {eventType ? eventType : undefined} size="large" onChange={(e: any): void => useEventType(e.target.value)}>
        <Radio.Button value={CalendarEventType.COUPLE}>커플일정</Radio.Button>
        <Radio.Button value={CalendarEventType.PERSONAL}>개인일정</Radio.Button>
      </Radio.Group>
    </>
  );
}

export default EventAddPopup;