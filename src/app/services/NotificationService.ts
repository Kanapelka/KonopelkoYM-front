import UserInfo from '../shared/models/UserInfo';
import Constants from '../Constatns';
import { Result } from './http/Http';
import NotificationModel from '../shared/models/NotificationModel';


const usersEndpoint: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/users`;
const notificationEndpoint: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/notifications`;

class NotificationService {
  public static async GetAllNotificationsForUser(userInfo: UserInfo): Promise<Array<Notification>> {
    const url: string = `${usersEndpoint}/${userInfo.userId}/notifications`;
    const params: RequestInit = { method: 'GET', headers: { Authorization: `Bearer ${userInfo.token}` } };

    const response = await fetch(url, params);
    const data: Array<Notification> = await response.json();

    return data;
  }

  public static async GetNewNotificationsForUser(userInfo: UserInfo): Promise<Array<NotificationModel>> {
    const url: string = `${usersEndpoint}/${userInfo.userId}/notifications/new`;
    const params: RequestInit = { method: 'GET', headers: { Authorization: `Bearer ${userInfo.token}` } };

    const response = await fetch(url, params);
    const data: Array<NotificationModel> = await response.json();

    return data;
  }

  public static async UpdateNotification(
    userInfo: UserInfo,
    notification: NotificationModel,
  ): Promise<Result<NotificationModel>> {
    const params: RequestInit = {
      method: 'PUT',
      headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(notification),
    };

    const response = await fetch(notificationEndpoint, params);
    const data = response.ok ? await response.json() : null;

    return { payload: data, status: response.status };
  }
}

export default NotificationService;
