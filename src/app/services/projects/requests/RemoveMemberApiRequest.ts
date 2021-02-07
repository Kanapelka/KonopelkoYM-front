import { DeleteApiRequest } from '../../http/IApiRequest';
import UserInfo from '../../../shared/models/UserInfo';
import Constants from '../../../Constatns';


class RemoveMemberApiRequest extends DeleteApiRequest<{}> {
  constructor(public userInfo: UserInfo, public memberId: number) {
    super();
  }


  getFullUrl(): string {
    return `${this.apiUrl}/${Constants.Urls.Api.MEMBERS}/${this.memberId}`;
  }

  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}` };
  }

  getRequestBody(): {} {
    return {};
  }
}

export default RemoveMemberApiRequest;
