// TODO declare, namespace, module 개념 정리하기
function getOrderedArray(size: number): Array<number> {
    return Array.from(Array(size).keys());
}

export {getOrderedArray};