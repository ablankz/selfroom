import { Box, Card, Skeleton } from '@mui/material';

export const MiniCardSkelton = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: (theme) => theme.spacing(3, 2, 3, 3),
      }}
    >
      <Skeleton sx={{ width: 48, height: 48, mr: 2 }} variant="circular" />
      <Box>
        <Skeleton variant="text" sx={{ height: 28, width: 100 }} />
        <Skeleton variant="text" sx={{ height: 18, width: 180 }} />
      </Box>
      <Skeleton variant='rounded' sx={{width: 60, height: 18, ml: 1.5}} />
    </Card>
  );
};
