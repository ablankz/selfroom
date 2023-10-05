import { ApplicationResponse } from '../application-response';

export type AuthUserData = {
  userId: string;
  nickname: string;
  profilePhoto?: string;
};

export type AuthUserResponse = ApplicationResponse<AuthUserData>;
