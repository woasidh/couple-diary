import { ReactElement, useEffect, useState } from 'react';

interface CounterProps {
    second: number;
    onRefreshBtnClick: () => void;
}

enum CounterState {
    RUNNING,
    FINISHED
}

const Counter = (props: CounterProps): ReactElement => {
  const [remainingSecond, setRemainingSecond] = useState<number>(props.second);
  const [counterStatus, setCounterStatus] = useState<CounterState>(CounterState.RUNNING);

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (remainingSecond > 0) {
        setRemainingSecond(remainingSecond - 1);
        setCounterStatus(CounterState.RUNNING);
      } else {
        setCounterStatus(CounterState.FINISHED);
      }
    }, 1000);
    return ((): void => {
      clearTimeout(timerID);
    });
  }, [remainingSecond]);

  function parseTime(seconds: number): string {
    let minute: number | string = Math.floor(seconds / 60);
    minute = minute < 10 ? `0${minute}` : minute.toString();

    let second: number | string = seconds % 60;
    second = second < 10 ? `0${second}` : second.toString();

    return `${minute}:${second}`;
  }

  const onRefreshBtnClick = (): void => {
    props.onRefreshBtnClick();
    setRemainingSecond(props.second);
  }

  return (
    <div className="counter">
      <span className="counter_time">{parseTime(remainingSecond)}</span>
      { counterStatus === CounterState.FINISHED &&
      <button className="counter_status" onClick = {onRefreshBtnClick}>
        새로고침
      </button> }
    </div>
  );
};

export default Counter;
