import { PutApiRequest } from '../../http/IApiRequest';
import ProjectMember, { Role } from '../../../shared/models/ProjectMember';
import UserInfo from '../../../shared/models/UserInfo';
import Constants from '../../../Constatns';


class UpdateRoleApiRequest extends PutApiRequest<{ projectId: number, userId: number, memberId: number, role: Role }> {
  constructor(public userInfo: UserInfo, public member: ProjectMember, public role: Role) {
    super();
  }

  getFullUrl(): string {
    return `${this.apiUrl}/${Constants.Urls.Api.MEMBERS}`;
  }

  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}`, 'Content-Type': 'application/json' };
  }

  getRequestBody(): { projectId: number; userId: number; memberId: number, role: Role } {
    return {
      memberId: this.member.memberId,
      projectId: this.member.projectId,
      userId: this.member.userId,
      role: this.role,
    };
  }
}

export default UpdateRoleApiRequest;
