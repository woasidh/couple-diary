export namespace StringUtil {
    export function isKeyCodeOneDigitNumber(keyCode: string): boolean {
      return parseInt(keyCode, 10) >= 48 && parseInt(keyCode, 10) <= 57;
    }

    export function getFirstKoreanName (koreanName: string): string {
      return koreanName.charAt(0);
    }

    export function dateToString(year: number, month: number, day: number): string {
      return `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+day : day}`;
    }

  export function convertToDate (dateStr: string): string {
    const year = dateStr.substr(0, 4);
    const month = dateStr.substr(4, 2);
    const day = dateStr.substr(6, 2);
    return [year, month, day].join('-');
  }
}
