import { SimpleChatRoom, SimpleUser } from ".";

export interface RoomHistory {
  userId: string;
  chatRoomId: string | null;
  visitedAt: string;
  leftAt: string;
}

export interface RoomHistoryWithUser {
  user: SimpleUser,
  chatRoomId: string | null;
  visitedAt: string;
  leftAt: string;
}

export interface RoomHistoryWithChatRoom {
  user: string,
  chatRoomId: SimpleChatRoom | null;
  visitedAt: string;
  leftAt: string;
}