import { useEffect, useCallback } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// hooks
import { useResponsive } from '@/hooks/use-responsive';
// components
import Iconify from '@/components/iconify';
//
import ChatRoomGroup from './chat-room-group';
import useCollapseNav from '@/hooks/use-collapse-nav';
import { SimpleUser } from '@/types/entity';

// ----------------------------------------------------------------------

const NAV_WIDTH = 240;

type Props = {
  onlineUsers: SimpleUser[];
};

export default function ChatRoom({ onlineUsers }: Props) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');

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
    if (!lgUp) {
      onCloseDesktop();
    }
  }, [onCloseDesktop, lgUp]);

  const handleToggleNav = useCallback(() => {
    if (lgUp) {
      onCollapseDesktop();
    } else {
      onOpenMobile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lgUp]);

  const renderToggleBtn = (
    <IconButton
      onClick={handleToggleNav}
      sx={{
        top: 12,
        right: 0,
        zIndex: 9,
        width: 32,
        height: 32,
        borderRight: 0,
        position: 'absolute',
        borderRadius: `12px 0 0 12px`,
        boxShadow: theme.customShadows.z8,
        bgcolor: theme.palette.background.paper,
        border: `solid 1px ${theme.palette.divider}`,
        '&:hover': {
          bgcolor: theme.palette.background.neutral,
        },
        ...(lgUp && {
          ...(!collapseDesktop && {
            right: NAV_WIDTH,
          }),
        }),
      }}
    >
      {lgUp ? (
        <Iconify
          width={16}
          icon={
            collapseDesktop
              ? 'eva:arrow-ios-back-fill'
              : 'eva:arrow-ios-forward-fill'
          }
        />
      ) : (
        <Iconify width={16} icon="eva:arrow-ios-back-fill" />
      )}
    </IconButton>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {renderToggleBtn}

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            flexShrink: 0,
            width: NAV_WIDTH,
            borderLeft: `solid 1px ${theme.palette.divider}`,
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.shorter,
            }),
            ...(collapseDesktop && {
              width: 0,
            }),
          }}
        >
          {!collapseDesktop && <ChatRoomGroup onlineUsers={onlineUsers} />}
        </Stack>
      ) : (
        <Drawer
          anchor="right"
          open={openMobile}
          onClose={onCloseMobile}
          slotProps={{
            backdrop: { invisible: true },
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          <ChatRoomGroup onlineUsers={onlineUsers} />
        </Drawer>
      )}
    </Box>
  );
}
