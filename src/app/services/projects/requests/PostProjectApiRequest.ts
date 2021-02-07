import { PostApiRequest } from '../../http/IApiRequest';
import Constants from '../../../Constatns';
import UserInfo from '../../../shared/models/UserInfo';


class PostProjectApiRequest extends PostApiRequest<{ projectName: string, ownerId: number }> {
  private userInfo: UserInfo;

  private readonly projectName: string;


  public constructor(userInfo: UserInfo, project: string) {
    super();
    this.userInfo = userInfo;
    this.projectName = project;
  }


  getFullUrl(): string {
    return `${this.apiUrl}/${Constants.Urls.Api.PROJECTS}`;
  }

  getHeaders(): any {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${this.userInfo.token}` };
  }

  getRequestBody(): { projectName: string, ownerId: number } {
    return { projectName: this.projectName, ownerId: this.userInfo.userId };
  }
}

export default PostProjectApiRequest;
