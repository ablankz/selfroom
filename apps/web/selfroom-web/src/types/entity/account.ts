import { Admin, User } from ".";

export interface Account {
  accountId: number;
  user: User | null;
  admin: Admin | null;
  createdAt: string;
  updatedAt: string;
};


export interface SimpleAccount {
  accountId: number;
  user: string | null;
  admin: string | null;
  createdAt: string;
  updatedAt: string;
}
