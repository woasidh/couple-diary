export namespace StringUtil {
    export function isKeyCodeOneDigitNumber(keyCode: string) {
        return parseInt(keyCode) >= 48 && parseInt(keyCode) <= 57;
    }
}