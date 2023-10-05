import { ApplicationResponse } from '../application-response';

type ResponseData = {
  redirectUrl: string;
};

export type SocialLoginResponse = ApplicationResponse<ResponseData>;
