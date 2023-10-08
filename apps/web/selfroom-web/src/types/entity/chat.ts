import { Admin, User } from ".";

export type Chat = {
  accountId: number;
  user: User | null;
  admin: Admin | null;
  createdAt: string;
  updatedAt: string;
};


export type SimpleChat = {
  accountId: number;
  user: string | null;
  admin: string | null;
  createdAt: string;
  updatedAt: string;
}
