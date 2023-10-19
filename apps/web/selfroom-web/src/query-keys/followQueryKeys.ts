import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const followQueryKeys = createQueryKeyStore({
  followees: {
    get: (id: string) => [id],
  },
  followers: {
    get: (id: string) => [id],
  },
});
