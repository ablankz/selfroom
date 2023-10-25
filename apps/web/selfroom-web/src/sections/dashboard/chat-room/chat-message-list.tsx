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
import { Dispatch, SetStateAction, useEffect } from 'react';

// ----------------------------------------------------------------------

type Props = {
  chatRoom: SimpleChatRoom;
  setDispatch: Dispatch<SetStateAction<boolean>>;
  dispatch: boolean;
};

export default function ChatMessageList({
  chatRoom,
  dispatch,
  setDispatch,
}: Props) {
  const { data, refetch } = useGetChatsQuery(chatRoom.chatRoomId, 1, 100);

  useEffect(() => {
    if (dispatch) {
      refetch();
      setDispatch(false);
    }
  }, [dispatch]);

  if (!data) {
    return <Navigate to={paths.error.server} replace />;
  }

  const { messagesEndRef } = useMessagesScroll(data.data);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {data.data.map((message) => (
            <ChatMessageItem
              key={message.chatId}
              message={message}
              chatRoomId={chatRoom.chatRoomId}
              setDispatch={setDispatch}
            />
          ))}
        </Box>
      </Scrollbar>
    </>
  );
}
