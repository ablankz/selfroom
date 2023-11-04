// @mui
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// components
import Iconify from '@/components/iconify';
import { Chat } from '@/types/entity';
import { useAuthContext } from '@/auth/hooks';
import { getDummyUser } from '@/utils/dummy-data';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { fDateTime } from '@/utils/format-time';
import { useLocales } from '@/locales';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { useChatDeleteQuery } from '@/api/chats/useChatDeleteQuery';
import { useSnackbar } from '@/components/snackbar';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

type Props = {
  chatRoomId: string;
  message: Chat;
  setRemoveChat: Dispatch<SetStateAction<string | undefined>>;
};

export default function ChatMessageItem({
  chatRoomId,
  message,
  setRemoveChat
}: Props) {
  const { user: auth } = useAuthContext();
  const { currentLang, t } = useLocales();
  const { userId, nickname, profilePhotoUrl } = message.user || getDummyUser();
  const { mutate, status } = useChatDeleteQuery(chatRoomId);
  const router = useRouter();
  const { chatId, content, createdAt } = message;
  const { enqueueSnackbar } = useSnackbar();
  
  const me = useMemo(() => auth?.userId === userId, [auth, message.user]);

  useEffect(() => {
    if (status === 'success') {
      setRemoveChat(chatId);
    } else if (status === 'error') {
      enqueueSnackbar({
        message: t('Undo message failed'),
        variant: 'error',
      });
    }
  }, [status]);

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!me && {
          mr: 'auto',
        }),
      }}
    >
      {!me && `${nickname},`} &nbsp;
      {fDateTime(createdAt, 'MMM dd HH:mm', currentLang.value)}
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        bgcolor: 'background.neutral',
        ...(me && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {content}
    </Stack>
  );

  const renderActions = (
    <Stack
      direction="row"
      className="message-actions"
      sx={{
        pt: 0.5,
        opacity: 0,
        top: '100%',
        left: 0,
        position: 'absolute',
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
        ...(me && {
          left: 'unset',
          right: 0,
        }),
      }}
    >
      {/* <IconButton size="small">
        <Iconify icon="solar:reply-bold" width={16} />
      </IconButton>
      <IconButton size="small">
        <Iconify icon="eva:smiling-face-fill" width={16} />
      </IconButton> */}
      <LoadingButton  loading={status === 'loading'} size="small" onClick={() => mutate(chatId)}>
        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
      </LoadingButton>
    </Stack>
  );

  return (
    <Stack
      component="div"
      direction="row"
      justifyContent={me ? 'flex-end' : 'unset'}
      sx={{ mb: 5 }}
    >
      {!me && (
        <Avatar
          alt={nickname}
          src={profilePhotoUrl || undefined}
          sx={{ width: 32, height: 32, mr: 2, cursor: 'pointer' }}
          onClick={() => router.push(paths.dashboard.profile(userId))}
        />
      )}

      <Stack alignItems="flex-end">
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
            ...(!me && {
              mr: 'auto',
            }),
          }}
        >
          {renderBody}
          {me && renderActions}
        </Stack>
      </Stack>
    </Stack>
  );
}
