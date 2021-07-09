import { FormInputs } from '@components/FormInput';
import { MESSAGES, METHOD, BASE_URL } from './api.consts';

type HeadersType = {
  [key: string]: string;
};

type OptionsType = {
  method: METHOD;
  data?: any;
  headers?: HeadersType;
};

type OptionsWithoutMethodType = Omit<OptionsType, 'method'>;

export function queryStringify<T extends object>(data: T): string {
  if (!data) return '';

  const queryArr = Object.entries(data).map(
    ([key, value]) => `${key}=${value}`,
  );

  return `?${queryArr.join('&')}`;
}

export class HTTP {
  currPath: string = BASE_URL;

  constructor(path = '') {
    this.currPath += path;
  }

  get(url: string, options: OptionsWithoutMethodType = {}) {
    return this.request(
      url,
      { ...options, method: METHOD.GET },
    );
  }

  post(url: string, options: OptionsWithoutMethodType = {}) {
    return this.request(
      url,
      { ...options, method: METHOD.POST },
    );
  }

  put(url: string, options: OptionsWithoutMethodType = {}) {
    return this.request(
      url,
      { ...options, method: METHOD.PUT },
    );
  }

  delete(
    url: string,
    options: OptionsWithoutMethodType = {},
  ) {
    return this.request(
      url,
      { ...options, method: METHOD.DELETE },
    );
  }

  async request(
    url: string,
    options: OptionsType = { method: METHOD.GET },
  ) {
    function serializeBody(method: METHOD, data: FormInputs) {
      if (method === METHOD.GET) {
        return;
      }

      return JSON.stringify(data);
    }

    function serializeHeader(method: METHOD) {
      const header = { 'Set-Cookie': 'HttpOnly' };
      if (method === METHOD.GET) {
        return header;
      }

      if (url === '/profile/avatar') {
        return { ...header, 'Content-Type': 'multipart/form-data' };
      }

      return { ...header, 'Content-Type': 'application/json' };
    }

    const { method, data } = options;

    const defaultReject = (response: Response) => {
      if (response.status >= 500) {
        console.error(MESSAGES.FAIL_MESSAGE_500_DEFAULT);
      } else {
        console.error(MESSAGES.FAIL_MESSAGE_DEFAULT);
      }
    };

    const basePath = `${this.currPath}${url}`;

    const path = method === METHOD.GET
      ? `${basePath}${queryStringify(data)}`
      : basePath;

    return await fetch(path, {
      method,
      mode: 'cors',
      credentials: 'include',
      body: serializeBody(method, data),
      headers: serializeHeader(method),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then((resData) => resData)
      .catch(defaultReject);
  }
}
