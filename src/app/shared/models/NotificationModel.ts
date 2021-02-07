/* eslint-disable */
class NotificationModel {
  constructor(public notificationId: number,
              public recipientId: number,
              public recipientFullName: string,
              public title: string,
              public message: string,
              public createdDate: Date,
              public expiredDate?: Date) {
  }
}

export default NotificationModel;
