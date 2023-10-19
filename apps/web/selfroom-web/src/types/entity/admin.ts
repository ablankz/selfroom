import { SimpleRole } from '.';

export interface Admin {
  adminId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  permissions: SimpleRole[];
  createdBy: SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
};

export interface SimpleAdmin {
  adminId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
};
