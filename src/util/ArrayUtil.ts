// TODO declare, namespace, module 개념 정리하기

export namespace ArrayUtil {
    export function getOrderedArray(size: number): Array<number> {
        return Array.from(Array(size).keys());
    }

    export function getRandomNumberArray(size: number, min: number = 0, max: number = 9): Array<number> {
        const arr:Array<number> = [];
        for (let i = 0 ; i < size ; i++) {
            arr.push(Math.floor((Math.random() * max)) - min);
        }
        return arr;
    }
}