import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const chatRoomQueryKeys = createQueryKeyStore({
  list: null,
  profile: {
    find: (id: string) => [id],
  },
});
