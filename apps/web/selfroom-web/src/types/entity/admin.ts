import { SimpleRole } from '.';

export type Admin = {
  adminId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  permissions: SimpleRole[];
  createdBy: SimpleAdmin | null;
  createdAt: string;
  updatedAt: string;
};

export type SimpleAdmin = {
  adminId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
};
