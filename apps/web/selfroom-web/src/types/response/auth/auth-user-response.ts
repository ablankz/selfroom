import { SimpleAdmin, SimpleRole } from '@/types/entity';
import { ApplicationResponse } from '../application-response';

export interface AuthUserData {
  userId?: string;
  adminId?: string;
  nickname: string;
  profilePhotoUrl: string | null;
  currentChatRoom?: string | null;
  favoriteRoomNum?: number;
  followNum?: number;
  followerNum?: number;
  permissions?: SimpleRole[];
  country?: string | null;
  description?: string | null;
  email?: string | null;
  company?: string | null;
  role?: string | null;
  school?: string | null;
  createdBy?: SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthUserResponse = ApplicationResponse<AuthUserData>;
