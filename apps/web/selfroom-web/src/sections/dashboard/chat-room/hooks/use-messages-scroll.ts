import { ChatsResponse } from '@/types/response/chat-room/chats-response';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ScrollValid } from '../chat-message-list';

// ----------------------------------------------------------------------

export default function useMessagesScroll(
  messages: ChatsResponse[],
  scrollEnable: ScrollValid,
  setScrollEnable: Dispatch<SetStateAction<ScrollValid>>
) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [_, setHeight] = useState(0);

  const scrollMessagesToBottom = useCallback(() => {
    if (scrollEnable !== 'top') {
      return;
    }

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
      if (scrollEnable !== 'none') {
        scrollEnable === 'top'
          ? scrollMessagesToBottom()
          : messagesEndRef.current &&
            messagesEndRef.current.scrollTo({
              top: messagesEndRef.current.scrollHeight,
              behavior: 'auto',
            });

        setScrollEnable('none');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages]
  );

  return {
    messagesEndRef,
  };
}
