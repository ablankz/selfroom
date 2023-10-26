import { SimpleChatRoom, SimpleUser } from ".";

export interface Chat {
  chatId: string;
  user: SimpleUser | null;
  chatRoom: SimpleChatRoom | null;
  content: string;
  createdAt: string;
  updatedAt: string;
};


export interface SimpleChat {
  chatId: string;
  userId: string | null;
  chatRoomId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}
