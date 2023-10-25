import { HOST_ASSET } from '@/config-global';
import { Chat, SimpleChatRoom, SimpleUser } from '@/types/entity';
import { uuidHash } from '@/utils/uuid-hash';
import uuidv4 from './uuidv4';
import {randomChar, ulid} from 'ulid';

export const getDummyUser = (): SimpleUser => {
  const uuid = uuidv4();
  const now = new Date();
  const formattedDate = now.toISOString();

  return {
    userId: uuid,
    nickname: 'Unknown',
    profilePhotoUrl: `${HOST_ASSET}/images/cover/cover_${uuidHash(uuid)}.jpg`,
    currentChatRoomId: null,
    favoriteRoomNum: 0,
    followNum: 0,
    followerNum: 0,
    country: null,
    description: null,
    email: null,
    company: null,
    role: null,
    school: null,
    createdAt: formattedDate,
    updatedAt: formattedDate,
  };
};

export const getDummyTalk = (chatRoom: SimpleChatRoom): Chat => {
  const now = new Date();
  const formattedDate = now.toISOString();

  return {
    chatId: ulid(),
    user: getDummyUser(),
    chatRoom,
    content: `hello dummy ${randomChar(Math.random)}`,
    createdAt: formattedDate,
    updatedAt: formattedDate,
  }
}
