export namespace StringUtil {
  export function isKeyCodeOneDigitNumber(keyCode: string): boolean {
    return parseInt(keyCode, 10) >= 48 && parseInt(keyCode, 10) <= 57;
  }

  export function getFirstKoreanName(koreanName: string): string {
    return koreanName.charAt(0);
  }

  export function dateToString(year: number, month: number, day: number): string {
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  export function convertToDate(dateStr: string): string {
    const year = dateStr.substr(0, 4);
    const month = dateStr.substr(4, 2);
    const day = dateStr.substr(6, 2);
    return [year, month, day].join('-');
  }

  // HH:MM:SS -> HH:MM
  export function parseDateToMinute(dateStr: string): string {
    return dateStr.substr(0, 5);
  }

  export function checkIfValidEmail(content: string): boolean {
    // http://emailregex.com에서 가져온 email regex
    const regex = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
    return !!content.match(regex);
  }
}
