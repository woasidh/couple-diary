import { ReactElement, useRef, useState } from 'react';
import { ArrayUtil } from '../../../../util/ArrayUtil';
import { StringUtil } from '../../../../util/StringUtil';

const CodeInput = () => {

    const inputContainerRef = useRef<HTMLDivElement>(null);
    const [code, setCode] = useState<Array<number>>(Array(6).fill(-1));

    function onClickSubmitBtn(): void {
        console.log(code, '제출 됨');
    }

    function onInputFocus(e: any): void {

        if (!e.target.value) return;

        // 이미 값이 있으면 state idx는 -1로 초기화
        const idx = parseInt(e.target.id);
        e.target.value = '';
        const newCode: Array<number> = idx !== 5
            ? [...code.slice(0, idx), -1, ...code.slice(idx + 1)]
            : [...code.slice(0, idx), -1];
        setCode(newCode);
    }

    function onInputKeyDown(e: any): void {

        // 숫자아니면 return
        if (!StringUtil.isKeyCodeOneDigitNumber(e.keyCode)) {
            e.preventDefault();
            return;
        }

        // state 배열 idx 업데이트
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

        // 다음 input 빈배열로 만들기
        if (inputContainerRef.current && !!e.target.value) {
            const idx = parseInt(e.target.id);
            const targetInput = inputContainerRef.current.children[idx + 1] as HTMLInputElement;
            targetInput?.focus();
        }
    }

    function codeInputItems(): Array<ReactElement> {
        return ArrayUtil.getOrderedArray(6).map((key) => (
            <input className="codeInputItem"
                type={'number'}
                id={key.toString()}
                key={key}
                onFocus={onInputFocus}
                onKeyDown={onInputKeyDown}
                onKeyUp={onInputKeyUp} />
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

export default CodeInput;