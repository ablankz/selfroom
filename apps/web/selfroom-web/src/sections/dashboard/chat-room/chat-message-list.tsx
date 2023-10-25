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
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { CircularProgress } from '@mui/material';
import {
  ChatData,
  ChatsResponse,
} from '@/types/response/chat-room/chats-response';

// ----------------------------------------------------------------------

type Props = {
  chatRoom: SimpleChatRoom;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  dispatch: boolean;
  addChat: ChatData | undefined;
  setAddChat: Dispatch<SetStateAction<ChatData | undefined>>;
};

export default function ChatMessageList({
  chatRoom,
  dispatch,
  setDispatch,
  addChat,
  setAddChat,
}: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useGetChatsQuery(chatRoom.chatRoomId, 10);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<ChatsResponse[]>([]);

  useLayoutEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [scrollRef]);

  let loadMoreMessage;
  if (isFetchingNextPage) {
    loadMoreMessage = 'Loading...';
  } else {
    loadMoreMessage = hasNextPage ? 'Read more' : ' ';
  }

  useEffect(() => {
    if (dispatch) {
      refetch();
      setDispatch(false);
    }
  }, [dispatch]);

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

  const { messagesEndRef } = useMessagesScroll(pages);

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
    [setPages]
  );

  useEffect(() => {
    if (!!addChat) {
      addTalk(addChat);
      setAddChat(undefined);
    }
  }, [addChat]);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box {...{ ref: loadMoreRef }} textAlign="center">
          {isFetchingNextPage && <CircularProgress />}
        </Box>
        <Box display="flex" flexDirection="column-reverse">
          {pages.map((page) => (
            <Fragment key={`${page.data.nextCursor}`}>
              {page.data.data.map((message) => (
                <ChatMessageItem
                  key={message.chatId}
                  message={message}
                  chatRoomId={chatRoom.chatRoomId}
                  setDispatch={setDispatch}
                />
              ))}
            </Fragment>
          ))}
        </Box>
      </Scrollbar>
    </>
  );
}
