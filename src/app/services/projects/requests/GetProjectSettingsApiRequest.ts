import { GetApiRequest } from '../../http/IApiRequest';
import UserInfo from '../../../shared/models/UserInfo';
import Constants from '../../../Constatns';


class GetProjectSettingsApiRequest extends GetApiRequest {
  private readonly userInfo: UserInfo;

  private readonly projectId: number;


  constructor(userInfo: UserInfo, projectId: number) {
    super();
    this.userInfo = userInfo;
    this.projectId = projectId;
  }


  getFullUrl(): string {
    return `${Constants.API_PROTOCOL}
://${Constants.DOMAIN}/${Constants.API_PATH}/${Constants.Urls.Api.PROJECTS}/${this.projectId}`;
  }

  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}` };
  }
}

export default GetProjectSettingsApiRequest;
