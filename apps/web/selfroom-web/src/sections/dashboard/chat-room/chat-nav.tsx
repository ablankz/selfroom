// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// hooks
import { useResponsive } from '@/hooks/use-responsive';
// routes
import { useRouter } from '@/routes/hooks';
import useCollapseNav from '@/hooks/use-collapse-nav';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Iconify from '@/components/iconify';
import { useCallback, useEffect, useMemo } from 'react';
import { paths } from '@/routes/paths';
import { AuthUserType } from '@/auth/types';
import Scrollbar from '@/components/scrollbar';
import { useGetChatRoomQuery } from '@/api/chat-rooms/useGetChatRoomQuery';
import { Navigate } from 'react-router-dom';
import FileThumbnail from '@/components/file-thumbnail';
import { uuidHash } from '@/utils/uuid-hash';
import { HOST_ASSET } from '@/config-global';
import { useBoolean } from '@/hooks/use-boolean';
import { useLocales } from '@/locales';
import { SimpleChatRoom } from '@/types/entity';
import { fDate } from '@/utils/format-time';
import { fNumber } from '@/utils/format-number';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useSnackbar } from '@/components/snackbar';

// ----------------------------------------------------------------------

const NAV_WIDTH = 320;

const NAV_COLLAPSE_WIDTH = 96;

type Props = {
  auth: AuthUserType;
  chatRoom: SimpleChatRoom;
};

export default function ChatNav({ auth, chatRoom }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const {
    collapseDesktop,
    onCloseDesktop,
    onCollapseDesktop,
    //
    openMobile,
    onOpenMobile,
    onCloseMobile,
  } = useCollapseNav();

  useEffect(() => {
    if (!mdUp) {
      onCloseDesktop();
    }
  }, [onCloseDesktop, mdUp]);

  const handleToggleNav = useCallback(() => {
    if (mdUp) {
      onCollapseDesktop();
    } else {
      onCloseMobile();
    }
  }, [mdUp, onCloseMobile, onCollapseDesktop]);

  const renderContent = (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 2.5, pb: 0 }}
      >
        {!collapseDesktop && (
          <>
            <Avatar
              src={auth?.profilePhotoUrl || undefined}
              alt={auth?.nickname}
              sx={{ cursor: 'pointer', width: 48, height: 48 }}
            />
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        <IconButton onClick={handleToggleNav}>
          <Iconify
            icon={
              collapseDesktop
                ? 'eva:arrow-ios-forward-fill'
                : 'eva:arrow-ios-back-fill'
            }
          />
        </IconButton>
      </Stack>

      <ChatNavInfo
        chatRoomId={chatRoom.chatRoomId}
        collapseDesktop={collapseDesktop}
      />
    </>
  );

  const renderToggleBtn = (
    <IconButton
      onClick={onOpenMobile}
      sx={{
        left: 0,
        top: 84,
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        borderRadius: `0 12px 12px 0`,
        bgcolor: theme.palette.primary.main,
        boxShadow: theme.customShadows.primary,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          bgcolor: theme.palette.primary.darker,
        },
      }}
    >
      <Iconify width={16} icon="solar:users-group-rounded-bold" />
    </IconButton>
  );

  return (
    <>
      {!mdUp && renderToggleBtn}

      {mdUp ? (
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: NAV_WIDTH,
            borderRight: `solid 1px ${theme.palette.divider}`,
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.shorter,
            }),
            ...(collapseDesktop && {
              width: NAV_COLLAPSE_WIDTH,
            }),
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openMobile}
          onClose={onCloseMobile}
          slotProps={{
            backdrop: { invisible: true },
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

type InfoProps = {
  chatRoomId: string;
  collapseDesktop: boolean;
};

const ChatNavInfo = ({ chatRoomId, collapseDesktop }: InfoProps) => {
  const { data, refetch } = useGetChatRoomQuery(chatRoomId);
  const toggleTags = useBoolean(true);
  const properties = useBoolean(true);
  const { t, currentLang } = useLocales();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const text = useBoolean(true);
  const router = useRouter();

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

  if (!data) {
    return <Navigate to={paths.error.server} replace />;
  }

  const imgUrl: string = useMemo(() => {
    if (data.data.coverPhotoUrl) return data.data.coverPhotoUrl;
    const index = uuidHash(chatRoomId, 0, 39);
    return `${HOST_ASSET}/images/cover/cover_${index}.jpg`;
  }, [data]);

  const renderTags = (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ typography: 'subtitle2' }}
      >
        {t('Categories')}
        <IconButton size="small" onClick={toggleTags.onToggle}>
          <Iconify
            icon={
              toggleTags.value
                ? 'eva:arrow-ios-upward-fill'
                : 'eva:arrow-ios-downward-fill'
            }
          />
        </IconButton>
      </Stack>

      {toggleTags.value && (
        <Stack direction="row" alignItems="center" spacing={1}>
          {data.data.categories.map((category) => (
            <Chip
              size="small"
              variant="soft"
              label={t(category.name)}
              key={category.roomCategoryId}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );

  const renderProperties = (
    <Stack spacing={1.5} mb={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ typography: 'subtitle2' }}
      >
        {t('Properties')}
        <IconButton size="small" onClick={properties.onToggle}>
          <Iconify
            icon={
              properties.value
                ? 'eva:arrow-ios-upward-fill'
                : 'eva:arrow-ios-downward-fill'
            }
          />
        </IconButton>
      </Stack>

      {properties.value && (
        <>
          <Stack
            direction="row"
            sx={{ typography: 'caption', textTransform: 'capitalize' }}
          >
            <Box
              component="span"
              sx={{ width: 80, color: 'text.secondary', mr: 2 }}
            >
              {t('Users')}
            </Box>
            {fNumber(data.data.userNum)}
          </Stack>

          <Stack
            direction="row"
            sx={{ typography: 'caption', textTransform: 'capitalize' }}
          >
            <Box
              component="span"
              sx={{ width: 80, color: 'text.secondary', mr: 2 }}
            >
              {t('Last Talk')}
            </Box>
            {fDate(data.data.updatedAt, 'MMM dd HH:mm', currentLang.value)}
          </Stack>

          <Stack
            direction="row"
            sx={{ typography: 'caption', textTransform: 'capitalize' }}
          >
            <Box
              component="span"
              sx={{ width: 80, color: 'text.secondary', mr: 2 }}
            >
              {t('Favors')}
            </Box>
            {fNumber(data.data.favorNum)}
          </Stack>

          <Stack
            direction="row"
            sx={{ typography: 'caption', textTransform: 'capitalize' }}
          >
            <Box
              component="span"
              sx={{ width: 80, color: 'text.secondary', mr: 2 }}
            >
              {t('Create Time')}
            </Box>
            {fDate(data.data.createdAt, 'MMM dd HH:mm', currentLang.value)}
          </Stack>
        </>
      )}
    </Stack>
  );

  return (
    <>
      <Scrollbar sx={{ height: 1, mt: 2 }}>
        <FileThumbnail imageView file={imgUrl} imgSx={{ borderRadius: 1 }} />
        {!collapseDesktop ? (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ p: 2.5 }}
            >
              <ListItemText
                primary={data.data.name}
                secondary={
                  <Typography
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

            <Stack
              spacing={2.5}
              justifyContent="center"
              sx={{
                p: 2.5,
                bgcolor: 'background.neutral',
              }}
            >
              {renderTags}

              <Divider sx={{ borderStyle: 'dashed' }} />

              {renderProperties}
            </Stack>
          </>
        ) : (
          <Stack mt={4} justifyContent="center" alignItems="center">
            <IconButton onClick={() => text.onToggle()}>
              <Iconify icon="material-symbols:switch-left" width={30} />
            </IconButton>
            {text.value ? (
              <Typography
                fontSize={28}
                sx={{
                  writingMode: 'vertical-rl',
                }}
              >
                {data.data.name}
              </Typography>
            ) : (
              <Typography
                onClick={() => onCopy()}
                sx={{
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  writingMode: 'vertical-rl',
                }}
              >
                {chatRoomId}
                <IconButton>
                  <Iconify icon="eva:copy-fill" width={24} />
                </IconButton>
              </Typography>
            )}
          </Stack>
        )}
      </Scrollbar>

      <Box sx={{ width: 1, p: 1.5 }}>
        <Stack
          flexDirection={!collapseDesktop ? 'row' : 'column'}
          justifyContent="space-around"
        >
          <IconButton
            onClick={() =>
              router.push(paths.dashboard.chatroom.profile(chatRoomId))
            }
          >
            <Iconify icon="mingcute:profile-fill" width={30} height={30} />
          </IconButton>
          <IconButton>
            <Iconify icon="iconamoon:exit-bold" width={30} height={30} />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};
