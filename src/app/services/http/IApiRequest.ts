// eslint-disable-next-line max-classes-per-file
import Constants from '../../Constatns';
import { Func } from '../../shared/delegates/delegates';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IApiRequest {
  getFullUrl: Func<string>;
  getHeaders: Func<any>;
  readonly Method: HttpMethod;
}

interface IApiRequestWithBody<TRequestBody> extends IApiRequest {
  getRequestBody: Func<TRequestBody>;
}


export abstract class ApiRequest implements IApiRequest {
  protected apiUrl: string = `${Constants.API_PROTOCOL}://${Constants.DOMAIN}/${Constants.API_PATH}`;

  public abstract getFullUrl(): string;

  public abstract getHeaders(): any;

  public abstract readonly Method: HttpMethod;
}

export abstract class ApiRequestWithBody<TRequestBody> extends ApiRequest implements IApiRequestWithBody<TRequestBody> {
  abstract getRequestBody(): TRequestBody;
}


export abstract class GetApiRequest extends ApiRequest {
  public readonly Method: HttpMethod = 'GET';
}


export abstract class PostApiRequest<TRequestBody> extends ApiRequestWithBody<TRequestBody> {
  public readonly Method: HttpMethod = 'POST';
}


export abstract class PutApiRequest<TRequestBody> extends ApiRequestWithBody<TRequestBody> {
  public readonly Method: HttpMethod = 'PUT';
}


export abstract class DeleteApiRequest<TRequestBody> extends ApiRequestWithBody<TRequestBody> {
  public readonly Method: HttpMethod = 'DELETE';
}
