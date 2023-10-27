// @mui
import Box from '@mui/material/Box';
// types
// components
import Scrollbar from '@/components/scrollbar';
//
import { useMessagesScroll } from './hooks';
// import ChatMessageItem from './chat-message-item';
import { SimpleChatRoom } from '@/types/entity';
import { useGetChatsQuery } from '@/api/chats/useGetChatsQuery';
import { Navigate } from 'react-router-dom';
import { paths } from '@/routes/paths';
import ChatMessageItem from './chat-message-item';
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { CircularProgress } from '@mui/material';
import { ChatData, ChatsResponse } from '@/types/response/chat-room/chats-response';
import { AddChat } from './view/chat-room-talk-view';

export const PAGE_TALK = 5;

export type ScrollValid = 'top' | 'bottom' | 'none';

// ----------------------------------------------------------------------

type Props = {
  chatRoom: SimpleChatRoom;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  dispatch: boolean;
  addChat: AddChat;
  setAddChat: Dispatch<SetStateAction<AddChat>>;
  removeChat: string | undefined;
  setRemoveChat: Dispatch<SetStateAction<string | undefined>>;
};

export default function ChatMessageList({
  chatRoom,
  dispatch,
  setDispatch,
  addChat,
  setAddChat,
  removeChat,
  setRemoveChat,
}: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useGetChatsQuery(chatRoom.chatRoomId, PAGE_TALK);
  const [pages, setPages] = useState<ChatsResponse[]>([]);
  const parentElementRef = useRef<HTMLDivElement>(null);
  const [scrollEnable, setScrollEnable] = useState<ScrollValid>('top');

  useEffect(() => {
    if (dispatch) {
      refetch();
      setDispatch(false);
    }
  }, [dispatch]);

  const { messagesEndRef } = useMessagesScroll(
    pages,
    scrollEnable,
    setScrollEnable
  );

  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (!data) {
    return <Navigate to={paths.error.server} replace />;
  }

  useEffect(() => {
    setPages(data.pages);
  }, [data]);

  const addTalk = useCallback(
    (talk: ChatData) => {
      setPages((prev) => {
        let [firstPage, ...other] = prev;
        if (firstPage) {
          firstPage = {
            ...firstPage,
            data: {
              ...firstPage.data,
              data: [talk, ...firstPage.data.data],
            },
          };
          return [firstPage, ...other];
        }
        return prev;
      });
    },
    [setPages, setScrollEnable]
  );

  const removeTalk = useCallback(
    (talkId: string) => {
      setScrollEnable('none');
      setPages((prev) => {
        let targetPage = -1;
        let targetChat = -1;
        prev.forEach((page, i) => {
          page.data.data.forEach((chat, j) => {
            if (chat.chatId === talkId) {
              targetPage = i;
              targetChat = j;
            }
          });
        });
        if (
          targetPage < 0 ||
          targetChat < 0 ||
          targetPage > prev.length ||
          targetPage > prev[targetPage].data.data.length
        )
          return prev;

        const newArray = prev.map((outerItem, outerIndex) => {
          if (outerIndex === targetPage) {
            return {
              ...outerItem,
              data: {
                ...outerItem.data,
                data: [
                  ...outerItem.data.data.slice(0, targetChat),
                  ...outerItem.data.data.slice(targetChat + 1),
                ],
              },
            };
          } else {
            return outerItem;
          }
        });
        return newArray;
      });
    },
    [setPages]
  );

  useEffect(() => {
    if (!!addChat.chat) {
      setScrollEnable(addChat.scroll);
      addTalk(addChat.chat);
      setAddChat({
        chat: undefined,
        scroll: 'none',
      });
    }
  }, [addChat]);

  useEffect(() => {
    if (!!removeChat) {
      removeTalk(removeChat);
      setRemoveChat(undefined);
    }
  }, [removeChat]);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box {...{ ref: loadMoreRef }} textAlign="center">
          {isFetchingNextPage && <CircularProgress />}
        </Box>
        <Box
          display="flex"
          flexDirection="column-reverse"
          ref={parentElementRef}
        >
          {pages.map((page) => (
            <Fragment key={`${page.data.nextCursor}`}>
              {page.data.data.map((message) => (
                <ChatMessageItem
                  key={message.chatId}
                  message={message}
                  chatRoomId={chatRoom.chatRoomId}
                  setRemoveChat={setRemoveChat}
                />
              ))}
            </Fragment>
          ))}
        </Box>
      </Scrollbar>
    </>
  );
}
