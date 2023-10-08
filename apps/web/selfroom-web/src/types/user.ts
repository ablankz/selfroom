export type User = {
  userId: string;
  nickname: string;
  profilePhotoUrl: string | null;
  currentChatRoom: string | null;
  favoriteRoomNum: number;
  followNum: number;
  followerNum: number;
  createdAt: string;
  updatedAt: string;
};
