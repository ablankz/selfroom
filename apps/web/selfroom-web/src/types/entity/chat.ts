import { SimpleChatRoom, SimpleRoomCategory, SimpleUser } from ".";

export type Chat = {
  chatId: string;
  user: SimpleUser | null;
  chatRoom: SimpleChatRoom | null;
  content: string;
  categories: SimpleRoomCategory[];
  createdAt: string;
  updatedAt: string;
};


export type SimpleChat = {
  chatId: string;
  userId: string | null;
  chatRoomId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}
