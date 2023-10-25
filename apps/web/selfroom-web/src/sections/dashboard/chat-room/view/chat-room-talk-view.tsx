// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { Button, Card, Stack, Typography } from '@mui/material';
import { useAuthContext } from '@/auth/hooks';
import { MotionContainer, varBounce } from '@/components/animate';
import { ForbiddenIllustration } from '@/assets/illustrations';
import { useRouter } from '@/routes/hooks';
import { m } from 'framer-motion';
import ChatHeaderDetail from '../chat-header-detail';
import ChatNav from '../chat-nav';

// ----------------------------------------------------------------------

export default function ChatRoomTalkView() {
  const { user: auth } = useAuthContext();
  const settings = useSettingsContext();
  const { t } = useLocales();
  const router = useRouter();

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

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      <ChatHeaderDetail chatRoom={auth.currentChatRoom} />
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
            {/* {renderMessages} */}

            {/* {details && <ChatRoom conversation={conversation} participants={participants} />} */}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
