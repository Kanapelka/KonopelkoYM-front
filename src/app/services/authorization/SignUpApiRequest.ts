import { PostApiRequest } from '../http/IApiRequest';
import Constants from '../../Constatns';

class SignUpApiRequest<User> extends PostApiRequest<User> {
  private readonly user: User;

  constructor(user: User) {
    super();

    this.user = user;
  }

  getFullUrl(): string {
    return `${this.apiUrl}/${Constants.Urls.Api.SIGN_UP}`;
  }

  getHeaders(): any {
    return { 'Content-Type': 'application/json' };
  }

  getRequestBody(): User {
    return this.user;
  }
}

export default SignUpApiRequest;
