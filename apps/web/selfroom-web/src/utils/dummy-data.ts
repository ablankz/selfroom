import { HOST_ASSET } from '@/config-global';
import { SimpleUser } from '@/types/entity';
import { uuidHash } from '@/utils/uuid-hash';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getDummyUser = (): SimpleUser => {
  const uuid = generateUUID();
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
