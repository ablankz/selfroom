import { SimpleAdmin, SimpleRole } from '@/types/entity';
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

export type AuthUserResponse = ApplicationResponse<AuthUserData>;
