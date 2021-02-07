import Constants from '../../../Constatns';
import UserInfo from '../../../shared/models/UserInfo';
import { GetApiRequest } from '../../http/IApiRequest';

class GetProjectTicketsApiRequest extends GetApiRequest {
  constructor(public userInfo: UserInfo, public projectId: number) {
    super();
  }

  getFullUrl(): string {
    return `${this.apiUrl}/${Constants.Urls.Api.PROJECTS}/${this.projectId}/tickets`;
  }

  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}` };
  }
}

export default GetProjectTicketsApiRequest;
