// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from '@/components/iconify';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from '@/components/snackbar';
import { useLocales } from '@/locales';
import { Button, Chip, Divider, IconButton, Link, Stack } from '@mui/material';
import { useRoomFavoriteQuery } from '@/api/favorites/useRoomFavoriteQuery';
import { useRoomFavoriteCancelQuery } from '@/api/favorites/useRoomFavoriteCancelQuery';
import { uuidHash } from '@/utils/uuid-hash';
import { HOST_ASSET } from '@/config-global';
import { fDate } from '@/utils/format-time';
import Scrollbar from '@/components/scrollbar';
import { ChatRoomCard } from '@/types/entity';
import RoomShareModal from '@/sections/_common/room-share-modal';
import { useChatRoomInQuery } from '@/api/room-visits/useChatRoomInQuery';
import RoomKeyModal from '@/sections/_common/room-key-modal';
import { useAuthContext } from '@/auth/hooks';

type RoomCardProps = {
  chatRoom: ChatRoomCard;
  handleSuccess: () => void;
};

export function RoomCard({ chatRoom, handleSuccess }: RoomCardProps) {
  const {
    chatRoomId,
    isFavorite,
    name,
    coverPhotoUrl,
    updatedAt,
    userNum,
    hasKey,
    categories,
  } = chatRoom;
  const [open, setOpen] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);
  const router = useRouter();
  const { mutate: favoriteAdd, status: favoriteStatus } =
    useRoomFavoriteQuery(chatRoomId);
  const { mutate: favoriteCancel, status: cancelStatus } =
    useRoomFavoriteCancelQuery(chatRoomId);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { mutate: roomIn, status: roomInStatus } =
    useChatRoomInQuery(chatRoomId);
  const roomInWithKey = useCallback(
    (key: string) => roomIn({ keyword: key }),
    [roomIn]
  );
  const { user: auth } = useAuthContext();
  console.log('aa', auth?.currentChatRoom);

  const handleFavorite = () => {
    if (isFavorite) favoriteCancel();
    else favoriteAdd();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyClose = () => {
    setKeyOpen(false);
  };

  const handleEnter = () => {
    if (hasKey) {
      setKeyOpen(true);
    } else {
      roomIn({});
    }
  };

  useEffect(() => {
    if (favoriteStatus === 'success') {
      handleSuccess();
      enqueueSnackbar({
        message: t('Successfully registered as a favorite'),
        variant: 'success',
      });
    } else if (favoriteStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed to register as a favorite'),
        variant: 'error',
      });
    }
  }, [favoriteStatus]);

  useEffect(() => {
    if (cancelStatus === 'success') {
      handleSuccess();
      enqueueSnackbar({
        message: t('Successfully unsubscribe from your favorites'),
        variant: 'success',
      });
    } else if (cancelStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed to unsubscribe from your favorites'),
        variant: 'error',
      });
    }
  }, [cancelStatus]);

  useEffect(() => {
    if (roomInStatus === 'success') {
      handleSuccess();
      enqueueSnackbar({
        message: t('Successfully enter the room'),
        variant: 'success',
      });
    } else if (roomInStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed to enter the room'),
        variant: 'error',
      });
    }
  }, [roomInStatus]);

  const imgUrl: string = useMemo(() => {
    if (coverPhotoUrl) return coverPhotoUrl;
    const index = uuidHash(chatRoomId, 0, 39);
    return `${HOST_ASSET}/images/cover/cover_${index}.jpg`;
  }, [chatRoomId, coverPhotoUrl]);

  return (
    <>
      <Card>
        <IconButton
          onClick={handleFavorite}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          color={isFavorite ? 'warning' : 'inherit'}
        >
          <Iconify icon="ant-design:star-filled" />
        </IconButton>
        {hasKey && (
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 40 }}
            color="warning"
          >
            <Iconify icon="solar:key-bold" />
          </IconButton>
        )}
        <IconButton
          sx={{ position: 'absolute', top: 8, right: hasKey ? 72 : 40 }}
          onClick={handleClickOpen}
        >
          <Iconify icon="material-symbols:share" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar
            alt={name}
            src={imgUrl}
            variant="rounded"
            sx={{ width: 48, height: 48, mb: 2 }}
          />

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Link
                onClick={() => router.push(paths.dashboard.profile(chatRoomId))}
                color="inherit"
              >
                {name}
              </Link>
            }
            secondary={`Last Activity: ${fDate(updatedAt)}`}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />

          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ color: 'primary.main', typography: 'caption' }}
          >
            <Iconify width={16} icon="solar:users-group-rounded-bold" />
            {userNum} Users In
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box>
          <Scrollbar>
            <Stack direction="row" spacing={1.5} px={2} py={1.5}>
              {categories.map((category) => (
                <Chip
                  label={t(category.name)}
                  key={category.roomCategoryId}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Scrollbar>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box justifyContent="flex-end" display="flex" px={3} py={2}>
          {auth?.currentChatRoom &&
          auth.currentChatRoom.chatRoomId === chatRoomId ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                router.push(paths.dashboard.chatroom.talk(chatRoomId))
              }
            >
              {t('Go to talk screen')}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleEnter}>
              {t('Entering the room')}
            </Button>
          )}
        </Box>
      </Card>
      <RoomShareModal
        open={open}
        handleClose={handleClose}
        roomId={chatRoomId}
        roomName={name}
      />
      <RoomKeyModal
        open={keyOpen}
        handleClose={handleKeyClose}
        mutate={roomInWithKey}
      />
    </>
  );
}
