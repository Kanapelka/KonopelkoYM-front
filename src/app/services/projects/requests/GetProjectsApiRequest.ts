import { GetApiRequest } from '../../http/IApiRequest';
import UserInfo from '../../../shared/models/UserInfo';
import Constants from '../../../Constatns';


class GetProjectsApiRequest extends GetApiRequest {
  private readonly userInfo: UserInfo;

  private readonly offset: number;

  private readonly count: number;

  private readonly filter?: string;


  constructor(userInfo: UserInfo, offset: number, count: number, filter?: string) {
    super();
    this.userInfo = userInfo;
    this.offset = offset;
    this.count = count;
    this.filter = filter;
  }


  getFullUrl(): string {
    const url = `${this.apiUrl}/${Constants.Urls.Api.USERS}/${this.userInfo.userId}/${Constants.Urls.Api.PROJECTS}?offset=${this.offset}&count=${this.count}`;
    return this.filter ? `${url}&filter=${this.filter}` : url;
  }


  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}` };
  }
}

export default GetProjectsApiRequest;
