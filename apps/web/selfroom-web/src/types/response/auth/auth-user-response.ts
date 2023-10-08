import { User, Admin, SimpleAdmin, SimpleRole } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export type AuthUserData = {
  userId?: string;
  adminId?: string;
  nickname: string;
  profilePhotoUrl: string | null;
  currentChatRoom?: string | null;
  favoriteRoomNum?: number;
  followNum?: number;
  followerNum?: number;
  permissions?: SimpleRole[];
  createdBy?: SimpleAdmin | null;
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
