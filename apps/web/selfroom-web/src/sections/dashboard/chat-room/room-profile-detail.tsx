import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useLocales } from '@/locales';
import { ChatRoomCard } from '@/types/entity';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useSnackbar } from '@/components/snackbar';
import Iconify from '@/components/iconify';
import { fDate } from '@/utils/format-time';
import { useAuthContext } from '@/auth/hooks';
import { paths } from '@/routes/paths';
import { useRouter } from '@/routes/hooks';
import { useChatRoomInQuery } from '@/api/room-visits/useChatRoomInQuery';
import RoomKeyModal from '@/sections/_common/room-key-modal';
import { fNumber } from '@/utils/format-number';

type Props = {
  data: ChatRoomCard;
  handleSuccess: () => void;
  setVisitDispatch: Dispatch<SetStateAction<boolean>>;
};

export const RoomProfileDetail = ({ data, handleSuccess, setVisitDispatch }: Props) => {
  const { name, chatRoomId, updatedAt, favorNum, createdAt, userNum, categories, hasKey } =
    data;
  const { enqueueSnackbar } = useSnackbar();
  const { t, currentLang } = useLocales();
  const { copy } = useCopyToClipboard();
  const { user: auth } = useAuthContext();

  const onCopy = useCallback(async () => {
    if (await copy(chatRoomId)) {
      enqueueSnackbar({
        message: t('copied'),
        variant: 'success',
      });
    } else {
      enqueueSnackbar({
        message: t('failed-copy'),
        variant: 'error',
      });
    }
  }, [copy, enqueueSnackbar]);
  const [keyOpen, setKeyOpen] = useState(false);
  const router = useRouter();
  const { mutate: roomIn, status: roomInStatus } =
    useChatRoomInQuery(chatRoomId);
  const roomInWithKey = useCallback(
    (key: string) => roomIn({ keyword: key }),
    [roomIn]
  );

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
    if (roomInStatus === 'success') {
      handleSuccess();
      enqueueSnackbar({
        message: t('Successfully enter the room'),
        variant: 'success',
      });
      setVisitDispatch(true);
    } else if (roomInStatus === 'error') {
      enqueueSnackbar({
        message: t('Failed to enter the room'),
        variant: 'error',
      });
    }
  }, [roomInStatus]);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          pt: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 0 },
        }}
      >
        <Stack spacing={1.5} alignItems="flex-start">
          <ListItemText
            sx={{
              mt: 3,
              ml: { md: 3 },
            }}
            primary={name}
            secondary={
              <Typography
                fontSize={16}
                onClick={() => onCopy()}
                sx={{
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
                color={'text.disabled'}
              >
                {chatRoomId}
                <IconButton>
                  <Iconify icon="eva:copy-fill" width={24} />
                </IconButton>
              </Typography>
            }
            primaryTypographyProps={{
              typography: 'h3',
            }}
            secondaryTypographyProps={{
              mt: 0.5,
              color: 'inherit',
              component: 'span',
              typography: 'h4',
              sx: { opacity: 0.48 },
            }}
          />
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {[
            {
              label: 'Last Talk',
              value: `${fDate(updatedAt, 'MMM dd HH:mm', currentLang.value)}`,
              icon: <Iconify icon="mdi:latest" />,
            },
            {
              label: 'Users',
              value: fNumber(userNum),
              icon: <Iconify icon="mdi:users" />,
            },
            {
              label: 'Favors',
              value: fNumber(favorNum),
              icon: <Iconify icon="material-symbols:favorite" />,
            },
            {
              label: 'Create Time',
              value: `${fDate(createdAt, 'MMM dd HH:mm', currentLang.value)}`,
              icon: <Iconify icon="eos-icons:subscriptions-created" />,
            },
          ].map((item) => (
            <Stack key={item.label} spacing={1.5} direction="row">
              {item.icon}
              <ListItemText
                primary={t(item.label)}
                secondary={item.value}
                primaryTypographyProps={{
                  typography: 'body2',
                  color: 'text.secondary',
                  mb: 0.5,
                }}
                secondaryTypographyProps={{
                  typography: 'subtitle2',
                  color: 'text.primary',
                  component: 'span',
                }}
              />
            </Stack>
          ))}
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack spacing={2}>
          <Typography variant="h5">{t('Categories')}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {categories.map((category) => (
              <Chip
                key={category.roomCategoryId}
                label={t(category.name)}
                variant="soft"
              />
            ))}
          </Stack>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box justifyContent="flex-end" display="flex" px={3} py={2}>
          {auth?.currentChatRoom &&
          auth.currentChatRoom.chatRoomId === chatRoomId ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(paths.dashboard.chatroom.talk)}
            >
              {t('Go to talk screen')}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleEnter}>
              {t('Entering the room')}
            </Button>
          )}
        </Box>
      </Stack>
      <RoomKeyModal
        open={keyOpen}
        handleClose={handleKeyClose}
        mutate={roomInWithKey}
      />
    </>
  );
};
