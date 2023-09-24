import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from '@/config-global';
import { ENDPOINTS } from '@/constants/endpoint';

// ----------------------------------------------------------------------

declare module 'axios' {
  export interface AxiosRequestConfig {
    timestamp?: number;
  }
  export interface AxiosResponse<T = any> {
    responseTime?: number;
  }
}

type Headers = {
  'Content-Type': string;
  'X-Requested-With': string;
  'CSRF-Token'?: string;
  'XSRF-TOKEN'?: string;
};

// default values
const headers: Headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

const axiosInstance = axios.create({
  baseURL: `${HOST_API}`,
  withCredentials: true,
  headers,
});

axiosInstance.interceptors.request.use((config) => {
  config.timestamp = Date.now();
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (!!response.config.timestamp)
      response.responseTime = Date.now() - response.config.timestamp;
    return response;
  },
  async (error: AxiosError<any>) => {
    // エラーハンドリング
    if (!!error.response?.config.timestamp)
      error.response.responseTime =
        Date.now() - error.response?.config.timestamp;
    return Promise.reject(error);
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export type MethodKey = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface EndpointBase {
  urlKey: string;
  method: MethodKey;
  url: string | ((...productsPrice: any[]) => string);
  comment: string;
  defaultBody?: {
    [key: string]: string;
  };
  defaultParam?: {
    [key: string]: string;
  };
  defaultHeader?: {
    [key: string]: string;
  };
}

export interface Endpoint {
  [key: string]: Endpoint | EndpointBase;
}

const isPlainEndpoint = (obj: Endpoint | EndpointBase): obj is EndpointBase => {
  return obj.hasOwnProperty('urlKey');
};

const flattenObject = (obj: Endpoint) => {
  const result: {
    [key: string]: any;
  } = {};

  for (const key in obj) {
    // 値を取得
    const value = obj[key];

    if (typeof value !== 'object' || isPlainEndpoint(value)) {
      result[key] = value;
    } else {
      const flatObj = flattenObject(value);
      for (const subKey in flatObj) {
        result[`${key}.${subKey}`] = flatObj[subKey];
      }
    }
  }
  return result;
};

function isMatch(text: string, target: string, strict?: boolean): boolean {
  if (!strict) strict = false;
  let endSlash = text.endsWith('/');
  // 一文字目が/から始まらない場合、/を追加する
  if (!text.startsWith('/')) {
    text = '/' + text;
  }

  if (!target.startsWith('/')) {
    target = '/' + target;
  }

  if (strict && text === '/') {
    return target === '/';
  }

  function persePath(path: string): string[] {
    // 文字列を '/' で分割し、空の要素を削除する
    return path.split('/').filter((element) => element !== '');
  }

  const perseText = persePath(text);
  const perseTarget = persePath(target);

  if (perseText.length < 1) return true;

  function generateRegexPattern(input: string): string {
    const characters = input.split('');
    const patterns = characters.map((_, index) => {
      const partialString = input.slice(0, index + 1);
      return `(${partialString})`;
    });

    return `(${patterns.join('|')})`;
  }

  return perseText.every((element, index, array) => {
    if (!(index in perseTarget)) return false;
    let targetPattern = '^';
    if (perseTarget[index] == '*') {
      targetPattern += '(.*)$';
    } else {
      if (strict) {
        targetPattern += `${perseTarget[index]}$`;
      } else {
        if (index === array.length - 1 && !endSlash) {
          targetPattern += `${generateRegexPattern(perseTarget[index])}$`;
        } else {
          targetPattern += `${perseTarget[index]}$`;
        }
      }
    }
    // 正規表現パターンを生成
    const pattern = new RegExp(`${targetPattern}`);

    // test メソッドを使用して一致を判定
    return pattern.test(element);
  });
}

function isStrictMatch(text: string, target: string): boolean {
  return isMatch(text, target, true);
}

export const endpointFilter = (
  method: MethodKey,
  key: string
): EndpointBase[] => {
  const fObject = flattenObject(ENDPOINTS);
  return Object.keys(fObject)
    .map((e) => {
      const endpoint: EndpointBase = fObject[e];
      if (method !== endpoint.method) return;
      if (!isMatch(key || '/', endpoint.urlKey)) return;
      return endpoint;
    })
    .filter((e): e is NonNullable<typeof e> => e !== undefined);
};

export const endpointMatch = (
  method: MethodKey,
  key: string
): EndpointBase | null => {
  const fObject = flattenObject(ENDPOINTS);
  const findKey = Object.keys(fObject).find((e) => {
    const endpoint: EndpointBase = fObject[e];
    if (method !== endpoint.method) return false;
    if (!isStrictMatch(key || '/', endpoint.urlKey)) return false;
    return true;
  });
  if (!findKey) return null;
  return fObject[findKey];
};
