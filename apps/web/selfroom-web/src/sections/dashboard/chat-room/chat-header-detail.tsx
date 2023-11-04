// @mui
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
// components
import Iconify from '@/components/iconify';
import { useGetInUsersQuery } from '@/api/room-visits/useGetInUsersQuery';
import { SimpleChatRoom } from '@/types/entity';
import { CircularProgress, ListItemText, Skeleton } from '@mui/material';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { Navigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useGetChatRoomQuery } from '@/api/chat-rooms/useGetChatRoomQuery';
import { useRoomFavoriteQuery } from '@/api/favorites/useRoomFavoriteQuery';
import { useRoomFavoriteCancelQuery } from '@/api/favorites/useRoomFavoriteCancelQuery';
import { useSnackbar } from 'notistack';
import RoomShareModal from '@/sections/_common/room-share-modal';

// ----------------------------------------------------------------------

type Props = {
  chatRoom: SimpleChatRoom;
};

export default function ChatHeaderDetail({ chatRoom }: Props) {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useGetChatRoomQuery(chatRoom.chatRoomId);
  const { mutate: favoriteAdd, status: favoriteStatus } = useRoomFavoriteQuery(
    chatRoom.chatRoomId
  );
  const { mutate: favoriteCancel, status: cancelStatus } =
    useRoomFavoriteCancelQuery(chatRoom.chatRoomId);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  if (!data) {
    return <Navigate to={paths.error.server} replace />;
  }

  const handleFavorite = () => {
    if (data.data.isFavorite) favoriteCancel();
    else favoriteAdd();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (favoriteStatus === 'success') {
      refetch();
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
      refetch();
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

  return (
    <>
      <Suspense
        fallback={
          <Skeleton
            variant="rounded"
            sx={{ width: { xs: 100, sm: 200, md: 400 } }}
            height={60}
          />
        }
      >
        <UserList chatRoom={chatRoom} />
      </Suspense>
      <Stack flexGrow={1} />

      {favoriteStatus === 'loading' || cancelStatus === 'loading' ? (
        <CircularProgress
          sx={{ position: 'absolute', top: 16, right: 16 }}
          size={20}
        />
      ) : (
        <IconButton
          onClick={handleFavorite}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          color={data.data.isFavorite ? 'warning' : 'inherit'}
        >
          <Iconify icon="ant-design:star-filled" />
        </IconButton>
      )}

      {data.data.hasKey && (
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 40 }}
          color="warning"
        >
          <Iconify icon="solar:key-bold" />
        </IconButton>
      )}
      <IconButton
        sx={{ position: 'absolute', top: 8, right: data.data.hasKey ? 72 : 40 }}
        onClick={handleClickOpen}
      >
        <Iconify icon="material-symbols:share" />
      </IconButton>
      <RoomShareModal
        open={open}
        handleClose={handleClose}
        roomId={chatRoom.chatRoomId}
        roomName={chatRoom.name}
      />
    </>
  );
}

const UserList = ({ chatRoom }: Props) => {
  const { data } = useGetInUsersQuery(chatRoom.chatRoomId, 1, 5);

  if (!data) {
    return <Navigate to={paths.error.server} replace />;
  }

  const group = data.data.totalCount > 1;

  const singleUser = data.data.data[0];

  const renderGroup = (
    <AvatarGroup
      max={data.data.totalCount < 2 ? undefined : data.data.totalCount}
      sx={{
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 32,
          height: 32,
        },
      }}
    >
      {data.data.data.map((user) => (
        <Avatar
          key={user.userId}
          alt={user.nickname}
          src={user.profilePhotoUrl || undefined}
        />
      ))}
    </AvatarGroup>
  );

  const renderSingle = (
    <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
      <Avatar
        src={singleUser.profilePhotoUrl || undefined}
        alt={singleUser.nickname}
      />

      <ListItemText
        primary={singleUser.nickname}
        secondary={singleUser.userId}
        secondaryTypographyProps={{
          component: 'span',
        }}
      />
    </Stack>
  );
  return <>{group ? renderGroup : renderSingle}</>;
};
