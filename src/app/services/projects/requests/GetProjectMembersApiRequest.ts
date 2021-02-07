import { GetApiRequest } from '../../http/IApiRequest';
import UserInfo from '../../../shared/models/UserInfo';
import Constants from '../../../Constatns';


class GetProjectMembersApiRequest extends GetApiRequest {
  private readonly userInfo: UserInfo;

  private readonly projectId: number;


  constructor(userInfo: UserInfo, projectId: number) {
    super();
    this.userInfo = userInfo;
    this.projectId = projectId;
  }


  getFullUrl(): string {
    return `${this.apiUrl}/${Constants.Urls.Api.PROJECTS}/${this.projectId}/members`;
  }

  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}` };
  }
}

export default GetProjectMembersApiRequest;
