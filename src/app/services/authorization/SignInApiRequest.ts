import Constants from '../../Constatns';
import { GetApiRequest } from '../http/IApiRequest';


class SignInApiRequest extends GetApiRequest {
  private readonly emailAddress: string;

  private readonly password: string;

  constructor(emailAddress: string, password: string) {
    super();

    this.emailAddress = emailAddress;
    this.password = password;
  }

  getFullUrl(): string {
    return `${this.apiUrl}/${Constants.Urls.Api.SIGN_IN}?email=${this.emailAddress}&password=${this.password}`;
  }

  getHeaders(): any {
    return { };
  }
}

export default SignInApiRequest;
