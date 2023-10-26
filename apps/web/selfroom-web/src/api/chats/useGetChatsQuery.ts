import {
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from '@/utils/axios';
import { CHAT_ROOMS_ENDPOINTS } from '@/constants/endpoints';
import { chatQueryKeys } from '@/query-keys/chatQueryKey';
import { ChatsResponse } from '@/types/response/chat-room/chats-response';
import { AxiosError } from 'axios';

const getChats = async (chatRoomId: string, limit: number, pageParam = '') => {
  return axios
    .get<ChatsResponse>(
      CHAT_ROOMS_ENDPOINTS.chatRooms.chats.get.url(chatRoomId),
      {
        params: {
          limit,
          pagination: 'cursor',
          order: 'create',
          order_opt: 'desc',
          cursor: pageParam,
        },
      }
    )
    .then((res) => res.data);
};

export const useGetChatsQuery = <TData = ChatsResponse>(
  chatRoomId: string,
  limit: number,
  options?: UseInfiniteQueryOptions<ChatsResponse, AxiosError, TData>
): UseInfiniteQueryResult<TData, AxiosError> =>
  useInfiniteQuery({
    queryKey: [chatQueryKeys.list.get(chatRoomId), { limit }],
    queryFn: ({ pageParam }) => getChats(chatRoomId, limit, pageParam),
    ...options,
    getPreviousPageParam: (firstPage) => firstPage.data.prevCursor ?? false,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? false,
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    useErrorBoundary: false,
    keepPreviousData: true,
    retry: false,
  });
