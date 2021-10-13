import React, {ReactElement, useEffect, useState} from 'react';
import './ConnectionContent.scss';
import Ago_comehere from '../../../resource/images/ago_comehere.png';
import {ArrayUtil} from "../../../util/ArrayUtil";

const ConnectionContent = () => {
    return (
        <div className='ConnectionContentContainer'>
            <img src={Ago_comehere} width={200} alt = 'ago_comehere' />
            <MyInvitationCode/>
            <InvitationGuide />
            <CodeInput/>
            <InvitationCodestatus/>
            <button className = "codeSubmitBtn">확인</button>
        </div>
    );
}

const MyInvitationCode = () => {

    function renderCodeItems(): Array<ReactElement> {
        return ArrayUtil.getRandomNumberArray(6).map((key) => (
            <div className="codeItem" key = {key}>{key}</div>
        ));
    }

    return (
        <div className="myInvitationContainer">
            <span>내 초드코드</span>
            <div className="myInvitationCode">
                {renderCodeItems()}
            </div>
        </div>
    );
}

const InvitationGuide = () => {
    return (
        <div className="invitationGuide">
            <span>상대방의 코드를 입력해주세요</span>
            <Counter second={ 180 }/>
        </div>
    );
}

const Counter = (props: CounterProps) => {

    /**
     * Counter 로직
     *
     */

    const [remainingSecond, setRemainingSecond] = useState<number>(props.second);
    const [counterStatus, setCounterStatus] = useState<CounterState>(CounterState.RUNNING);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let timerID = setTimeout(() => {
            remainingSecond > 0 ? setRemainingSecond(remainingSecond - 1) : setCounterStatus(CounterState.FINISHED);
        }, 20); // TODO 타이머 시간 바꾸기
        return (() => {
            clearTimeout(timerID);
        });
    }, [remainingSecond,refresh]);

    // useEffect(() => {
    //     let a = setTimeout(() => {
    //        console.log('1');
    //     }, 1000);
    //     return (() => {
    //         clearTimeout(a);
    //     });
    // }, []);



    function parseTime(seconds: number): string {
        let minute: number | string = Math.floor(seconds / 60);
        minute = minute < 10 ? `0${minute}` : minute.toString();

        let second: number | string = seconds % 60;
        second = second < 10 ? `0${second}` : second.toString();

        return `${minute}:${second}`;
    }

    function showCounterState(): string {
        return counterStatus === CounterState.RUNNING
        ? '' : '새로고침';
    }

    return (
        <div className = 'counter'>
            <span className = 'counter_time'>{parseTime(remainingSecond)}</span>
            <button className = 'counter_status'>{showCounterState()}</button>
        </div>
    );
}

interface CounterProps {
    second: number;
}

enum CounterState {
    RUNNING,
    FINISHED
}

const CodeInput = () => {

    function codeInputItems(): Array<ReactElement> {
        return [1, 2, 3, 4, 5, 6].map((key) => (
            <div className="codeInputItem" key = {key}/>
        ));
    }

    return (
        <div className="codeInputContainer">
            {codeInputItems()}
        </div>
    );
}

const InvitationCodestatus = () => {
    return (
        <div className = 'invitationCodeStatus'>6자리를 모두 채워주세요</div>
    );
}

export default ConnectionContent;