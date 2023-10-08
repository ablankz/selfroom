import { User } from '@/types/user';
import { ApplicationResponse } from '../application-response';
import { RoleData } from '../role/role-response';
import { Admin, SimpleAdminData } from '@/types/admin';

export type AuthUserData = {
  userId?: string;
  adminId?: string;
  nickname: string;
  profilePhotoUrl: string | null;
  currentChatRoom?: string | null;
  favoriteRoomNum?: number;
  followNum?: number;
  followerNum?: number;
  permissions?: RoleData[];
  createdBy?: SimpleAdminData | null;
  createdAt: string;
  updatedAt: string;
};

export const isUser = (auth: AuthUserData): auth is User => {
  return !!(auth as User)?.userId
}

export const isAdmin = (auth: AuthUserData): auth is Admin => {
  return !!(auth as Admin)?.adminId
}

export type AuthUserResponse = ApplicationResponse<AuthUserData>;
