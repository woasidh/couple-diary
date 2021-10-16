import React, {ReactElement, useEffect, useRef, useState} from 'react';
import './ConnectionContent.scss';
import Ago_comehere from '../../../resource/images/ago_comehere.png';
import {ArrayUtil} from "../../../util/ArrayUtil";
import {StringUtil} from "../../../util/StringUtil";

const ConnectionContent = () => {

    return (
        <div className='ConnectionContentContainer'>
            <img src={Ago_comehere} width={200} alt='ago_comehere'/>
            <MyInvitationCode/>
            <InvitationGuide/>
            <CodeInput/>
        </div>
    );
}

const MyInvitationCode = () => {

    function renderCodeItems(): Array<ReactElement> {
        return ArrayUtil.getRandomNumberArray(6).map((key, idx) => (
            <div className="codeItem" key={idx}>{key}</div>
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
            <Counter second={180}/>
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
        <div className='counter'>
            <span className='counter_time'>{parseTime(remainingSecond)}</span>
            <button className='counter_status'>{showCounterState()}</button>
        </div>
    );
}

const CodeInput = () => {

    const inputContainerRef = useRef<HTMLDivElement>(null);
    const [code, setCode] = useState<Array<number>>([-1, -1, -1, -1, -1, -1]);

    function onClickSubmitBtn(): void {
        console.log(code);
    }

    function onInputFocus(e: any): void {
        if (e.target.value) {
            const idx = parseInt(e.target.id);
            e.target.value = '';
            const newCode: Array<number> = idx !== 5
                ? [...code.slice(0, idx), -1, ...code.slice(idx + 1)]
                : [...code.slice(0, idx), -1];
            setCode(newCode);
        }
    }

    function onInputKeyDown(e: any): void {
        // TODO preventDefault, stopPropagation 정리하기
        if (!StringUtil.isKeyCodeOneDigitNumber(e.keyCode)) {
            e.preventDefault();
            return;
        }
        const idx = parseInt(e.target.id);
        const inputNum = parseInt(e.keyCode) - 48;
        if (e.target.value) e.target.value = '';
        const newCode: Array<number> = idx !== 5
            ? [...code.slice(0, idx), inputNum, ...code.slice(idx + 1)]
            : [...code.slice(0, idx), inputNum];
        setCode(newCode);
    }

    function onInputKeyUp(e: any): void {
        if (!StringUtil.isKeyCodeOneDigitNumber(e.keyCode)) return;
        if (inputContainerRef.current && !!e.target.value) {
            const idx = parseInt(e.target.id);
            const targetInput = inputContainerRef.current.children[idx + 1] as HTMLInputElement;
            targetInput?.focus();
        }
    }

    function codeInputItems(): Array<ReactElement> {
        return ArrayUtil.getOrderedArray(6).map((key) => (
            <input className="codeInputItem"
                   maxLength={2}
                   type={'number'}
                   id={key.toString()}
                   key={key}
                   onFocus={onInputFocus}
                   onKeyDown={onInputKeyDown}
                   onKeyUp={onInputKeyUp}/>
        ));
    }

    return (
        <>
            <div className="codeInputContainer" ref={inputContainerRef}>{codeInputItems()}</div>
            <div className='invitationCodeStatus'>6자리를 모두 채워주세요</div>
            <button className="codeSubmitBtn" onClick={onClickSubmitBtn}>확인</button>
        </>
    );
}


export default ConnectionContent;