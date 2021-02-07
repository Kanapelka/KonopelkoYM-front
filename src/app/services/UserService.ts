import UserProfile from '../shared/models/UserProfile';
import UserInfo from '../shared/models/UserInfo';
import { Result } from './http/Http';
import Constants from '../Constatns';


class UserService {
  public static async GetUserProfile(userInfo: UserInfo, id: number): Promise<Result<UserProfile>> {
    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/users/${id}`;
    const params: RequestInit = { method: 'GET', headers: { Authorization: `Bearer ${userInfo.token}` } };

    const response = await fetch(url, params);
    const data = response.ok ? await response.json() : null;

    return { status: response.status, payload: data };
  }

  public static async UpdateUserProfile(userInfo: UserInfo, profile: UserProfile): Promise<Result<UserProfile>> {
    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/users`;
    const params: RequestInit = {
      method: 'PUT',
      headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    };

    const response = await fetch(url, params);
    const data = response.ok ? await response.json() : null;

    return { status: response.status, payload: data };
  }
}

export default UserService;
