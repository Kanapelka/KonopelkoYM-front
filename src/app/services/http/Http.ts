import { ApiRequest, ApiRequestWithBody } from './IApiRequest';

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
}

export type Result<TResult> = {
  status: number,
  payload: TResult,
}

class Http {
  static async Call<TResponseBody>(request: ApiRequest): Promise<Result<TResponseBody>> {
    const params: RequestInit = { headers: request.getHeaders(), method: request.Method };

    const response = await fetch(request.getFullUrl(), params);

    let data = null;
    if (response.ok) {
      data = await response.json();
    }

    return { status: response.status, payload: data };
  }

  static async CallWithBody<
    TResponseBody,
    TRequestBody
    >(request: ApiRequestWithBody<TRequestBody>): Promise<Result<TResponseBody>> {
    const params: RequestInit = {
      headers: request.getHeaders(), body: JSON.stringify(request.getRequestBody()), method: request.Method,
    };

    const response = await fetch(request.getFullUrl(), params);

    let data = null;
    if (response.ok) {
      data = await response.json();
    }

    return { status: response.status, payload: data };
  }
}

export default Http;
