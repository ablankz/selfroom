import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// routes
import { useRouter } from '@/routes/hooks';
// components
import { varHover } from '@/components/animate';
import CustomPopover, { usePopover } from '@/components/custom-popover';
import { useAuthContext } from '@/auth/hooks';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { useSnackbar } from '@/components/snackbar';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Profile',
    linkTo: paths.dashboard.profile,
  },
  {
    label: 'Setting',
    linkTo: (_: string) => paths.dashboard.setting,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const { t } = useLocales();
  const { logout, user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      enqueueSnackbar({
        message: t('Logout successfully'),
        variant: 'success',
      });
      popover.onClose();
    } catch (error) {
      popover.onClose();
      // enqueueSnackbar({
      //   message: t('Logout failed'),
      //   variant: 'error',
      // });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.profilePhotoUrl || undefined}
          alt={user?.nickname}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user && user?.nickname.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      {user ? (
        <CustomPopover
          open={popover.open}
          onClose={popover.onClose}
          sx={{ width: 200, p: 0 }}
        >
          <Box sx={{ p: 2, pb: 1.5 }}>
            <Typography variant="subtitle2" noWrap>
              {user.nickname}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: user.userId ? 'text.secondary' : 'primary.main' }}
              noWrap
            >
              {user.userId ? `${user.userId}` : `${user.adminId}`}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack sx={{ p: 1 }}>
            {OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() =>
                  handleClickItem(
                    option.linkTo(
                      user.userId ? `${user.userId}` : `${user.adminId}`
                    )
                  )
                }
              >
                {t(option.label)}
              </MenuItem>
            ))}
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem
            onClick={handleLogout}
            sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
          >
            {t('Logout')}
          </MenuItem>
        </CustomPopover>
      ) : (
        <CustomPopover
          open={popover.open}
          onClose={popover.onClose}
          sx={{ width: 200, p: 0 }}
        >
          <MenuItem
            onClick={() => handleClickItem(paths.dashboard.auth)}
            sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'info.main' }}
          >
            {t('Login')}
          </MenuItem>
        </CustomPopover>
      )}
    </>
  );
}
