import { Box, alpha, styled } from '@mui/material';
import { bgGradient } from '@/theme/css';

export const StyledRoot = styled(Box)(({ theme }) => ({
  ...bgGradient({
    color: alpha(
      theme.palette.background.default,
      theme.palette.mode === 'light' ? 0.9 : 0.94
    ),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  position: 'relative',
}));
