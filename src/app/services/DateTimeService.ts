import moment from 'moment';


class DateTimeService {
  static toNotificationFormat(datetime: Date): string {
    return moment(datetime).locale('ru').format('YYYY-MM-DD, HH:mm:ss').toString();
  }
}

export default DateTimeService;
