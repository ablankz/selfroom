import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const chatQueryKeys = createQueryKeyStore({
  list: {
    get: (chatRoomId: string) => [chatRoomId],
  }
});
