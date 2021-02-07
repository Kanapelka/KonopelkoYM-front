import { PostApiRequest } from '../../http/IApiRequest';
import TicketStatus from '../../../shared/models/TicketStatus';
import UserInfo from '../../../shared/models/UserInfo';


class PostTicketApiRequest extends PostApiRequest<TicketStatus> {
  constructor(public userInfo: UserInfo, public ticketStatus: TicketStatus) {
    super();
  }


  getFullUrl(): string {
    return `${this.apiUrl}/statuses`;
  }

  getHeaders(): any {
    return { Authorization: `Bearer ${this.userInfo.token}`, 'Content-Type': 'application/json' };
  }

  getRequestBody(): TicketStatus {
    return this.ticketStatus;
  }

}

export default PostTicketApiRequest;
