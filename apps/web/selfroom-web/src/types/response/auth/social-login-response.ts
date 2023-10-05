import { ApplicationResponse } from '../application-response';

type ResponseData = {
  redirect_url: string;
};

export type SocialLoginResponse = ApplicationResponse<ResponseData>;
