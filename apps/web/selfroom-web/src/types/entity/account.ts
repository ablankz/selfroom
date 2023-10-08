import { Admin, User } from ".";

export type Account = {
  accountId: number;
  user: User | null;
  admin: Admin | null;
  createdAt: string;
  updatedAt: string;
};


export type SimpleAccount = {
  accountId: number;
  user: string | null;
  admin: string | null;
  createdAt: string;
  updatedAt: string;
}
