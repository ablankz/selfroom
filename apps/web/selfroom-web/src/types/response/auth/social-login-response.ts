import { ApplicationResponse } from '../application-response';

interface ResponseData {
  redirectUrl: string;
};

export type SocialLoginResponse = ApplicationResponse<ResponseData>;
