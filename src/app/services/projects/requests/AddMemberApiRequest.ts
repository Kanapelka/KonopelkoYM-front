import { PostApiRequest } from '../../http/IApiRequest';
import UserInfo from '../../../shared/models/UserInfo';
import Constants from '../../../Constatns';


class AddMemberApiRequest extends PostApiRequest<{}> {
  constructor(public userInfo: UserInfo, public projectId: number, public emailAddress: string) {
    super();
  }


  getFullUrl(): string {
    return `${this.apiUrl}/${Constants.Urls.Api.PROJECTS}/${this.projectId}/members?email=${this.emailAddress}`;
  }

  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}` };
  }

  getRequestBody(): { } {
    return { };
  }
}

export default AddMemberApiRequest;
