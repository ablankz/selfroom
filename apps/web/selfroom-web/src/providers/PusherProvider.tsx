import { ReactNode, useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';
import { HOST_API } from '../config-global';
import { useAuthContext } from '@/auth/hooks';
import { SimpleUser } from '@/types/entity';
import { useSetRecoilState } from 'recoil';
import { onlineUsersState } from '@/store/roomOnlineUset';

type Props = {
  children: ReactNode;
};

declare interface Window {
  Echo: Echo;
}

declare var window: Window;

const options = {
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_KEY || '',
  encrypted: true,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || '',
  authorizer: (channel: any, _: any) => {
    return {
      authorize: (socketId: any, callback: any) => {
        axios
          .post(
            `${HOST_API}/broadcasting/auth`,
            {
              socket_id: socketId,
              channel_name: channel.name,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
};

window.Echo = new Echo({
  ...options,
  client: new Pusher(options.key, options),
});

export const PusherProvider = ({ children }: Props) => {
  const { user: auth } = useAuthContext();
  const setOnlineUsers = useSetRecoilState(onlineUsersState);

  useEffect(() => {
    if (auth?.currentChatRoom?.chatRoomId) {
      const channel = `chat-rooms-online.${auth.currentChatRoom.chatRoomId}`;
      window.Echo.join(channel)
        .here((users: SimpleUser[]) => {
          setOnlineUsers(users);
        })
        .joining((user: SimpleUser) => {
          setOnlineUsers((prev) => [...prev, user]);
        })
        .leaving((user: SimpleUser) => {
          setOnlineUsers((prev) => {
            return prev.filter((u) => u.userId !== user.userId);
          });
        });
    }

    return () => {
      if (auth?.currentChatRoom?.chatRoomId) {
        const channel = `chat-rooms-online.${auth.currentChatRoom.chatRoomId}`;
        window.Echo.leave(channel);
      }
    };
  }, [auth?.currentChatRoom]);

  return <>{children}</>;
};
