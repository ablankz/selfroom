import { ApplicationResponse } from '../application-response';

export type RoleData = {
  roleId: number;
  name: string;
};

export type SocialLoginResponse = ApplicationResponse<RoleData>;
