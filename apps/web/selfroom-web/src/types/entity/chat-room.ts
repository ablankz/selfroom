import { SimpleRoomCategory } from '.';

export interface ChatRoom {
  chatRoomId: string;
  name: string;
  userNum: number;
  favorNum: number;
  coverPhotoUrl: string | null;
  categories: SimpleRoomCategory[];
  hasKey: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SimpleChatRoom {
  chatRoomId: string;
  name: string;
  userNum: number;
  favorNum: number;
  coverPhotoUrl: string | null;
  hasKey: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoomCard extends ChatRoom {
  isFavorite: boolean;
}
