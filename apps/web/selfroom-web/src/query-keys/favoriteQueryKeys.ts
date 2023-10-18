import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const favoriteQueryKeys = createQueryKeyStore({
  favorites: {
    get: (id: string) => [id],
  },
});
