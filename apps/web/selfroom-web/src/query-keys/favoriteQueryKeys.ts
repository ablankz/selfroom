import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const favoriteQueryKeys = createQueryKeyStore({
  favavorites: {
    get: (id: string) => [id],
  },
});
