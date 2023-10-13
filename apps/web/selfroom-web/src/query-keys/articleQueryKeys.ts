import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const articleQueryKeys = createQueryKeyStore({
  onTerritory: {
    list: (territoryId: string) => [territoryId],
  },
  article: {
    detail: (id: string) => [id],
  },
});
