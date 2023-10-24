import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const roomVisitQueryKeys = createQueryKeyStore({
  visitRooms: {
    get: (id: string) => [id],
  },
  visitors: {
    get: (id: string) => [id],
  },
});
