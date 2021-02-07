import { PutApiRequest } from '../../http/IApiRequest';
import UserInfo from '../../../shared/models/UserInfo';
import Constants from '../../../Constatns';


class UpdateProjectApiRequest extends PutApiRequest<{ projectId: number, name: string }> {
  private readonly userInfo: UserInfo;

  private readonly project: { projectId: number, name: string }


  constructor(userInfo: UserInfo, projectName: string, projectId: number) {
    super();
    this.userInfo = userInfo;
    this.project = { projectId, name: projectName };
  }


  getFullUrl(): string {
    return `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}/${Constants.Urls.Api.PROJECTS}`;
  }

  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}`, 'Content-Type': 'application/json' };
  }

  getRequestBody(): { projectId: number; name: string } {
    return this.project;
  }
}

export default UpdateProjectApiRequest;
