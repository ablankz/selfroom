import { SimpleChatRoom } from '.';

export interface User {
  userId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  currentChatRoom: SimpleChatRoom | null;
  favoriteRoomNum: number;
  followNum: number;
  followerNum: number;
  country: string | null;
  description: string | null;
  email: string | null;
  company: string | null;
  role: string | null;
  school: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface SimpleUser {
  userId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  currentChatRoomId: string | null;
  favoriteRoomNum: number;
  followNum: number;
  followerNum: number;
  country: string | null;
  description: string | null;
  email: string | null;
  company: string | null;
  role: string | null;
  school: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface UserCard extends User {
  isFollow: boolean;
};

export interface Visitor extends SimpleUser {
  visitedAt: string;
  leftAt: string;
}