import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

declare module 'axios' {
  export interface AxiosResponse<T = any> {   
    errorMessage?: string;
  }
}

type Headers = {
  'X-Requested-With': string;
  'CSRF-Token'?: string;
  'XSRF-TOKEN'?: string;
};

// default values
const headers: Headers = {
  'X-Requested-With': 'XMLHttpRequest',
};

const axiosInstance = axios.create({
  baseURL: `${HOST_API}`,
  withCredentials: true,
  headers,
});

export default axiosInstance;

export const rawAxiosInstance = axios.create({
  baseURL: `${HOST_API}`,
  withCredentials: true,
  headers,
});

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};