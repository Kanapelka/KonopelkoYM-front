import ProjectBoard from '../../shared/models/ProjectBoard';
import TicketStatus from '../../shared/models/TicketStatus';
import TicketThumbnailModel from '../../shared/models/TicketThumbnailModel';
import Http, { HttpStatus, Result } from '../http/Http';
import GetProjectTicketsApiRequest from './requests/GetProjectTicketsApiRequest';
import GetStatusesApiRequest from './requests/GetStatusesApiRequest';
import PostProjectApiRequest from './requests/PostProjectApiRequest';
import UserInfo from '../../shared/models/UserInfo';
import Project from '../../shared/models/Project';
import GetProjectsApiRequest from './requests/GetProjectsApiRequest';
import ProjectThumbnailModel from '../../shared/models/ProjectThumbnailModel';
import GetProjectMembersApiRequest from './requests/GetProjectMembersApiRequest';
import GetProjectSettingsApiRequest from './requests/GetProjectSettingsApiRequest';
import UpdateProjectApiRequest from './requests/UpdateProjectApiRequest';
import ProjectMember, {Role} from '../../shared/models/ProjectMember';
import AddMemberApiRequest from './requests/AddMemberApiRequest';
import RemoveMemberApiRequest from './requests/RemoveMemberApiRequest';
import UpdateRoleApiRequest from './requests/UpdateRoleApiRequest';
import Constants from '../../Constatns';


class ProjectsService {
  static async CreateProject(projectName: string, userInfo: UserInfo): Promise<Result<Project>> {
    const response: Result<Project> = await Http.CallWithBody(new PostProjectApiRequest(userInfo, projectName));
    return response;
  }

  static async LoadProjects(
    userInfo: UserInfo, offset: number, count: number, filter?: string,
  ): Promise<Result<ProjectThumbnailModel[]>> {
    const getProjectsApiRequest = new GetProjectsApiRequest(userInfo, offset, count, filter);
    const response: Result<ProjectThumbnailModel[]> = await Http.Call(getProjectsApiRequest);

    if (response.status !== HttpStatus.Ok) {
      return response;
    }

    for (let i = 0; i < response.payload.length; i += 1) {
      const getProjectMembersApiRequest = new GetProjectMembersApiRequest(userInfo, response.payload[i].projectId);
      // eslint-disable-next-line no-await-in-loop
      const members: Result<ProjectMember[]> = await Http.Call(getProjectMembersApiRequest);
      response.payload[i].members = members.payload;
    }

    return response;
  }

  static async LoadProjectSettings(userInfo: UserInfo, projectId: number): Promise<Result<ProjectThumbnailModel>> {
    const getProjectSettingsApiRequest = new GetProjectSettingsApiRequest(userInfo, projectId);
    const response: Result<ProjectThumbnailModel> = await Http.Call(getProjectSettingsApiRequest);

    if (response.status === HttpStatus.Ok) {
      const getProjectMembersApiRequest = new GetProjectMembersApiRequest(userInfo, projectId);
      const members: Result<ProjectMember[]> = await Http.Call(getProjectMembersApiRequest);
      response.payload.members = members.payload;
    }

    return response;
  }

  static async UpdateProject(userInfo: UserInfo, projectName: string, projectId: number) {
    const updateProject = new UpdateProjectApiRequest(userInfo, projectName, projectId);
    const response: Result<ProjectThumbnailModel> = await Http.CallWithBody(updateProject);

    return response;
  }

  static async AddMember(userInfo: UserInfo, projectId: number, emailAddress: string): Promise<Result<any>> {
    const addMemberApiRequest = new AddMemberApiRequest(userInfo, projectId, emailAddress);
    const response: Result<any> = await Http.Call(addMemberApiRequest);

    return response;
  }

  static async UpdateRole(userInfo: UserInfo, member: ProjectMember, role: Role): Promise<Result<any>> {
    const updateRoleApiRequest = new UpdateRoleApiRequest(userInfo, member, role);
    const response: Result<any> = await Http.CallWithBody(updateRoleApiRequest);

    return response;
  }

  static async RemoveMember(userInfo: UserInfo, memberId: number): Promise<Result<any>> {
    const removeMemberApiRequest = new RemoveMemberApiRequest(userInfo, memberId);
    const response: Result<any> = await Http.Call(removeMemberApiRequest);

    return response;
  }

  static async LoadBoard(userInfo: UserInfo, projectId: number): Promise<Result<ProjectBoard>> {
    const projectResponse = await this.LoadProjectSettings(userInfo, projectId);
    if (projectResponse.status !== HttpStatus.Ok) {
      // @ts-ignore
      return { status: projectResponse.status };
    }

    const getStatuses = new GetStatusesApiRequest(userInfo, projectId);
    const statusesResponse: Result<TicketStatus[]> = await Http.Call(getStatuses);

    const getTickets = new GetProjectTicketsApiRequest(userInfo, projectId);
    const ticketsResponse: Result<TicketThumbnailModel[]> = await Http.Call(getTickets);

    return {
      status: ticketsResponse.status,
      payload: {
        projectId,
        tickets: ticketsResponse.payload,
        members: projectResponse.payload.members,
        name: projectResponse.payload.projectName,
        statuses: statusesResponse.payload,
      },
    };
  }

  static async DeleteProject(userInfo: UserInfo, projectId: number): Promise<Result<string>> {
    const url: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/projects/${projectId}`;
    const params: RequestInit = { method: 'DELETE', headers: { Authorization: `Bearer ${userInfo.token}` } };

    const result = await fetch(url, params);

    return { status: result.status, payload: '' };
  }
}

export default ProjectsService;
