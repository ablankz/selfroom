import { SimpleChatRoom } from ".";

export type User = {
  userId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  currentChatRoom: SimpleChatRoom | null;
  favoriteRoomNum: number;
  followNum: number;
  followerNum: number;
  createdAt: string;
  updatedAt: string;
};

export type SimpleUser = {
  userId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  currentChatRoomId: string | null;
  favoriteRoomNum: number;
  followNum: number;
  followerNum: number;
  createdAt: string;
  updatedAt: string;
};