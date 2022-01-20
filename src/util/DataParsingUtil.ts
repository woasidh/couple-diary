import {CalendarEventData, CalendarEventType} from '../redux_module/CalendarEvent';

export namespace DataParsingUtil {
  export function parseToCalendarEvent(apiData: any, eventType: CalendarEventType): CalendarEventData {
    const date = apiData.date.split('T')[0].split('-').join('');
    const time = [apiData.startTime, apiData.endTime];
    const name = apiData.title;
    const memo = apiData.memo;
    return {type: eventType, name, time, memo};
  }
}