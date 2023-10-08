import { RoleData } from "./response/role/role-response";

export type Admin = {
  adminId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  permissions: RoleData[];
  createdBy: SimpleAdminData | null;
  createdAt: string;
  updatedAt: string;
};


export type SimpleAdminData = {
  adminId: string;
  nuckname: string;
  profilePhotoUrl?: string;
  permissions: RoleData[];
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}
