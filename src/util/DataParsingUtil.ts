import {CalendarEventData, CalendarEventType} from '../redux_module/CalendarEvent';

export namespace DataParsingUtil {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  export function parseToCalendarEvent(apiData: any, eventType: CalendarEventType): CalendarEventData {
    const time = apiData.startTime ? [apiData.startTime, apiData.endTime] : null;
    const name = apiData.title;
    const memo = apiData.memo;
    return {num: apiData.id, type: eventType, name, time, memo};
  }
}