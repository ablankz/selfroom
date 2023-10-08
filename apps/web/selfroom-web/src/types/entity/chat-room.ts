import { SimpleUser } from ".";

export type ChatRoom = {
  chatId: string;
  user: SimpleUser | null;
  chatRoom: SimpleChatRoom | null;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type SimpleChatRoom = {
  chatId: string;
  userId: string | null;
  chatRoomId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
};
