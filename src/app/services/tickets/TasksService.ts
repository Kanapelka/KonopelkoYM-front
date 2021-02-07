import Task from '../../shared/models/Task';
import UserInfo from '../../shared/models/UserInfo';
import { Result } from '../http/Http';
import Constants from '../../Constatns';


class TasksService {
  public static async AddTask(task: Task, userInfo: UserInfo): Promise<Result<Task>> {
    const request: RequestInit = {
      method: 'POST',
      headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    };

    const result = await this.Call(request);
    return result;
  }

  public static async UpdateTask(task: Task, userInfo: UserInfo): Promise<Result<Task>> {
    const request: RequestInit = {
      method: 'PUT',
      headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    };

    const result = await this.Call(request);
    return result;
  }

  public static async DeleteTask(taskId: number, userInfo: UserInfo): Promise<Result<Task>> {
    const request: RequestInit = {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const result = await this.Call(request, taskId);
    return result;
  }

  private static async Call(request: RequestInit, id?: number): Promise<Result<Task>> {
    let url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/tasks`;
    if (id) {
      url = `${url}/${id}`;
    }

    const response = await fetch(url, request);

    let data = null;
    if (response.ok && request.method !== 'DELETE') {
      data = await response.json();
    }

    return { status: response.status, payload: data };
  }
}

export default TasksService;
