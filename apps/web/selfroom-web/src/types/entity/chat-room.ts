import { SimpleRoomCategory } from ".";

export type ChatRoom = {
  chatRoomId: string;
  name: string;
  userNum: number;
  favorNum: number;
  coverPhotoUrl: string;
  categories: SimpleRoomCategory[];
  hasKey: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SimpleChatRoom = {
  chatRoomId: string;
  name: string;
  userNum: number;
  favorNum: number;
  coverPhotoUrl: string;
  hasKey: boolean;
  createdAt: string;
  updatedAt: string;
};
