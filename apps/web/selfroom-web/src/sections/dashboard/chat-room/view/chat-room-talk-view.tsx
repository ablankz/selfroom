// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { Button, Card, Skeleton, Stack, Typography } from '@mui/material';
import { useAuthContext } from '@/auth/hooks';
import { MotionContainer, varBounce } from '@/components/animate';
import { ForbiddenIllustration } from '@/assets/illustrations';
import { useRouter } from '@/routes/hooks';
import { m } from 'framer-motion';
import ChatHeaderDetail from '../chat-header-detail';
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';
import ChatMessageInput from '../chat-message-input';
import ChatMessageList from '../chat-message-list';
import { Suspense, useEffect, useState } from 'react';
import { TalkSkelton } from '../talk-skelton';
import { ChatData } from '@/types/response/chat-room/chats-response';
import Echo from 'laravel-echo';
import { SimpleUser } from '@/types/entity';

declare interface Window {
  Echo: Echo;
}

declare var window: Window;

// ----------------------------------------------------------------------

export default function ChatRoomTalkView() {
  const { user: auth } = useAuthContext();
  const settings = useSettingsContext();
  const { t } = useLocales();
  const router = useRouter();
  const [dispatch, setDispatch] = useState(false);
  const [addChat, setAddChat] = useState<ChatData | undefined>(undefined);
  const [removeChat, setRemoveChat] = useState<string | undefined>(undefined);
  const [onlineUsers, setOnlineUsers] = useState<SimpleUser[]>([]);

  if (!auth?.currentChatRoom?.chatRoomId) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <MotionContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
          }}
        >
          <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              No permission
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              {t('You must enter the chat room to view this page.')}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <ForbiddenIllustration
              sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            />
          </m.div>

          <Button
            sx={{
              maxWidth: '10rem',
            }}
            onClick={() => router.push(paths.dashboard.chat)}
            size="large"
            variant="contained"
          >
            {t('Entering the Room')}
          </Button>
        </MotionContainer>
      </Container>
    );
  }

  useEffect(() => {
    if (auth.currentChatRoom?.chatRoomId) {
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
      if (auth.currentChatRoom?.chatRoomId) {
        const channel = `chat-rooms-online.${auth.currentChatRoom.chatRoomId}`;
        window.Echo.leave(channel);
      }
    };
  }, [auth.currentChatRoom]);

  console.log(onlineUsers);

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <Suspense fallback={<TalkSkelton />}>
        <ChatMessageList
          chatRoom={auth.currentChatRoom}
          dispatch={dispatch}
          setDispatch={setDispatch}
          addChat={addChat}
          setAddChat={setAddChat}
          removeChat={removeChat}
          setRemoveChat={setRemoveChat}
        />
      </Suspense>

      <ChatMessageInput
        disabled={false}
        chatRoom={auth.currentChatRoom}
        setAddChat={setAddChat}
      />
    </Stack>
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      <Suspense
        fallback={<Skeleton variant="rounded" width={120} height={20} />}
      >
        <ChatHeaderDetail chatRoom={auth.currentChatRoom} />
      </Suspense>
    </Stack>
  );

  const renderNav = <ChatNav auth={auth} chatRoom={auth.currentChatRoom} />;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Chat')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Chat'), href: paths.dashboard.chat },
          { name: t('Talk') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}
            <ChatRoom onlineUsers={onlineUsers} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
