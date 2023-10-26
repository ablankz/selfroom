import { ChatsResponse } from '@/types/response/chat-room/chats-response';
import { useCallback, useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------

export default function useMessagesScroll(messages: ChatsResponse[]) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [_, setHeight] = useState(0);

  const scrollMessagesToBottom = useCallback(() => {
    if (!messages.length) {
      return;
    }

    if (!messagesEndRef.current) {
      return;
    }

    if (messagesEndRef.current) {
      setHeight((prev) => {
        messagesEndRef.current &&
          messagesEndRef.current.scrollTo({
            top: messagesEndRef.current.scrollHeight - prev,
            behavior: 'auto',
          });
        return messagesEndRef.current?.scrollHeight || 0;
      });
    }
  }, [messages]);

  useEffect(
    () => {
      scrollMessagesToBottom();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages]
  );

  return {
    messagesEndRef,
  };
}
