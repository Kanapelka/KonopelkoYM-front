import Http, { Result } from '../http/Http';
import Constants from '../../Constatns';
import UserInfo from '../../shared/models/UserInfo';
import TicketStatus from '../../shared/models/TicketStatus';
import PostTicketApiRequest from './api-requests/PostTicketApiRequest';

class TicketStatusService {
  public static async CreateNewStatus(userInfo: UserInfo, status: TicketStatus) : Promise<Result<TicketStatus>> {
    const apiRequest = new PostTicketApiRequest(userInfo, status);
    const response: Result<TicketStatus> = await Http.CallWithBody(apiRequest);

    return response;
  }

  public static async RemoveStatus(userInfo: UserInfo, id: number): Promise<void> {
    const params: RequestInit = { method: 'DELETE', headers: { Authorization: `Bearer ${userInfo.token}` } };
    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/statuses/${id}`;

    const result = await fetch(url, params);
  }
}

export default TicketStatusService;
