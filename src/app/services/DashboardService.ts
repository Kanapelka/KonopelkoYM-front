import UserProfile from '../shared/models/UserProfile';
import TicketThumbnailModel from '../shared/models/TicketThumbnailModel';
import ProjectThumbnailModel from '../shared/models/ProjectThumbnailModel';
import UserInfo from '../shared/models/UserInfo';
import Constants from '../Constatns';
import ProjectsService from './projects/ProjectsService';


class DashboardService {
  public static async GetUsersRecentlyWorkedWith(userInfo: UserInfo): Promise<Array<UserProfile>> {
    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/dashboard/${userInfo.userId}/teammates`;
    const params: RequestInit = { method: 'GET', headers: { Authorization: `Bearer ${userInfo.token}` } };

    const response = await fetch(url, params);
    const data: Array<UserProfile> = await response.json();
    return data;
  }

  static async GetHighestPriorityTickets(userInfo: UserInfo): Promise<Array<TicketThumbnailModel>> {
    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/dashboard/${userInfo.userId}/tickets`;
    const params: RequestInit = { method: 'GET', headers: { Authorization: `Bearer ${userInfo.token}` } };

    const response = await fetch(url, params);
    const data: Array<TicketThumbnailModel> = await response.json();
    return data;
  }

  public static async GetRecentProjects(userInfo: UserInfo): Promise<Array<ProjectThumbnailModel>> {
    const projects = await ProjectsService.LoadProjects(userInfo, 0, 3);
    return projects.payload;
  }
}

export default DashboardService;
