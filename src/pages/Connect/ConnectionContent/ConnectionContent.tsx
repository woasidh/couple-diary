import React, {ReactElement, useEffect, useRef, useState} from 'react';
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
        return ArrayUtil.getRandomNumberArray(6).map((key, idx) => (
            <div className="codeItem" key = {idx}>{key}</div>
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

interface CounterProps {
    second: number;
}

enum CounterState {
    RUNNING,
    FINISHED
}

const Counter = (props: CounterProps) => {

    const [remainingSecond, setRemainingSecond] = useState<number>(props.second);
    const [counterStatus, setCounterStatus] = useState<CounterState>(CounterState.RUNNING);

    useEffect(() => {
        let timerID = setTimeout(() => {
            remainingSecond > 0 ? setRemainingSecond(remainingSecond - 1) : setCounterStatus(CounterState.FINISHED);
        }, 20);
        return (() => {
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

const CodeInput = () => {

    const inputContainerRef = useRef<HTMLDivElement>(null);

    function onInputFocus(e: any): void {
        if (inputContainerRef.current) {
            const inputIdx: number = parseInt(e.target.id);
            const inputElements = inputContainerRef.current.children;
            for (let i = inputIdx; i < 6 ; i++) {
                // TODO element, typescript 정리하기
                const inputElement = inputElements[i] as HTMLInputElement;
                inputElement.value = '';
            }
        }
    }

    function onInputKeyDown(e: any): void {
        e.preventDefault();
        const isKeyDownNumber: boolean = e.keyCode >= 48 && e.keyCode <= 57;
        if (!isKeyDownNumber) {
            return;
        }else if(inputContainerRef.current) {
            e.target.value = e.key;
            const nextTargetInput = inputContainerRef.current?.children[parseInt(e.target.id) + 1] as HTMLInputElement;
            nextTargetInput?.focus();
        }

    }

    function codeInputItems(): Array<ReactElement> {
        return ArrayUtil.getOrderedArray(6).map((key) => (
            <input className="codeInputItem" maxLength={1} id = {key.toString()} key = {key} onKeyDown={onInputKeyDown} onFocus={onInputFocus}/>
        ));
    }

    return (
        <div className="codeInputContainer" ref = {inputContainerRef}>
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