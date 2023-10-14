import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const userQueryKeys = createQueryKeyStore({
  profile: {
    find: (id: string) => [id],
  },
});
