import { ApplicationResponse } from '../application-response';

export type AuthUserData = {
  user_id: string;
  nickname: string;
  profile_photo?: string;
};

export type AuthUserResponse = ApplicationResponse<AuthUserData>;
