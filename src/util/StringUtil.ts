export namespace StringUtil {
    export function isKeyCodeOneDigitNumber(keyCode: string): boolean {
      return parseInt(keyCode, 10) >= 48 && parseInt(keyCode, 10) <= 57;
    }

    export function getFirstKoreanName (koreanName: string): string {
      return koreanName.charAt(0);
    }
}
