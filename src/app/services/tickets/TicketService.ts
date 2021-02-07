import Ticket from '../../shared/models/Ticket';
import Constants from '../../Constatns';
import UserInfo from '../../shared/models/UserInfo';
import { Result } from '../http/Http';
import CommentModel from '../../shared/models/CommentModel';
import Task from '../../shared/models/Task';


class TicketService {
  public static async UpdateOrCreateTicket(ticket: Ticket, userInfo: UserInfo): Promise<Result<Ticket>> {
    const request: RequestInit = {
      method: 'PUT',
      body: JSON.stringify(ticket),
      headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' },
    };

    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/tickets`;

    const response = await this.Call<Ticket>(url, request);
    return response;
  }

  public static async GetTicket(id: number, userInfo: UserInfo): Promise<Result<Ticket>> {
    const request: RequestInit = {
      method: 'GET',
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/tickets/${id}`;

    const response = await this.Call<Ticket>(url, request);
    return response;
  }

  public static async GetTicketComments(id: number, userInfo: UserInfo): Promise<Result<Array<CommentModel>>> {
    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/tickets/${id}/comments`;
    const request: RequestInit = {
      method: 'GET',
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const response = await this.Call<Array<CommentModel>>(url, request);
    return response;
  }

  public static async GetTasksAsync(id: number, userInfo: UserInfo): Promise<Result<Array<Task>>> {
    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/tickets/${id}/tasks`;
    const request: RequestInit = {
      method: 'GET',
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const response = await this.Call<Array<Task>>(url, request);
    return response;
  }

  private static async Call<TBody>(url: string, request: RequestInit): Promise<Result<TBody>> {
    const response = await fetch(url, request);

    let data = null;
    if (response.ok) {
      data = await response.json();
    }

    return { status: response.status, payload: data };
  }
}

export default TicketService;
