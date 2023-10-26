import { useRoomFavoriteCancelQuery } from '@/api/favorites/useRoomFavoriteCancelQuery';
import { useRoomFavoriteQuery } from '@/api/favorites/useRoomFavoriteQuery';
import Iconify from '@/components/iconify';
import { HOST_ASSET } from '@/config-global';
import { ChatRoomCard } from '@/types/entity';
import { uuidHash } from '@/utils/uuid-hash';
import { bgGradient } from '@/theme/css';
import { Box, IconButton, alpha, useTheme } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from '@/components/snackbar';
import { useLocales } from '@/locales';
import RoomShareModal from '@/sections/_common/room-share-modal';

type Props = {
  data: ChatRoomCard;
  handleSuccess: () => void;
  setFavorDispatch: Dispatch<SetStateAction<boolean>>;
};

export const RoomProfileImage = ({ data, handleSuccess, setFavorDispatch }: Props) => {
  const theme = useTheme();
  const { coverPhotoUrl, chatRoomId, isFavorite, hasKey, name } = data;
  const [open, setOpen] = useState(false);
  const imgUrl: string = useMemo(() => {
    if (coverPhotoUrl) return coverPhotoUrl;
    const index = uuidHash(chatRoomId, 0, 39);
    return `${HOST_ASSET}/images/cover/cover_${index}.jpg`;
  }, [chatRoomId, coverPhotoUrl]);
  const { mutate: favoriteAdd, status: favoriteStatus } =
    useRoomFavoriteQuery(chatRoomId);
  const { mutate: favoriteCancel, status: cancelStatus } =
    useRoomFavoriteCancelQuery(chatRoomId);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

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

  useEffect(() => {
    if (favoriteStatus === 'success') {
      handleSuccess();
      enqueueSnackbar({
        message: t('Successfully registered as a favorite'),
        variant: 'success',
      });
      setFavorDispatch(true);
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
      setFavorDispatch(true);
    } else if (cancelStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed to unsubscribe from your favorites'),
        variant: 'error',
      });
    }
  }, [cancelStatus]);

  const renderLargeImg = (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.6),
          imgUrl,
        }),
        width: {
          xs: '95%',
          md: '80%'
        },
        height: {
          xs: '75%',
          md: '80%',
        },
        paddingTop: {
          xs: '75%',
          md: '80%',
        },
        position: 'relative',
        borderRadius: 3,
      }}
    >
      <IconButton
        onClick={handleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: (t) => alpha(t.palette.background.default, 0.6),
        }}
        color={isFavorite ? 'warning' : 'inherit'}
      >
        <Iconify icon="ant-design:star-filled" />
      </IconButton>
      {hasKey && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 48,
            bgcolor: (t) => alpha(t.palette.background.default, 0.6),
          }}
          color="warning"
        >
          <Iconify icon="solar:key-bold" />
        </IconButton>
      )}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: hasKey ? 88 : 48,
          bgcolor: (t) => alpha(t.palette.background.default, 0.6),
        }}
        onClick={handleClickOpen}
      >
        <Iconify icon="material-symbols:share" />
      </IconButton>
    </Box>
  );

  return (
    <Box display='flex' justifyContent='center'>
      {renderLargeImg}
      <RoomShareModal
        open={open}
        handleClose={handleClose}
        roomId={chatRoomId}
        roomName={name}
      />
    </Box>
  );
};
