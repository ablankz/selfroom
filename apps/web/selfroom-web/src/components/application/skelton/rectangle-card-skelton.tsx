import { Box, Card, Divider, Skeleton, Stack } from '@mui/material';

export const RectangleCardSkelton = () => {
  return (
    <Card>
      <Skeleton
        sx={{ position: 'absolute', top: 8, right: 8, width: 30, height: 30 }}
        variant="rounded"
      />
      <Skeleton
        sx={{ position: 'absolute', top: 8, right: 40, width: 30, height: 30 }}
        variant="rounded"
      />
      <Skeleton
        sx={{ position: 'absolute', top: 8, right: 72, width: 30, height: 30 }}
        variant="rounded"
      />

      <Stack sx={{ p: 3, pb: 2 }}>
        <Skeleton sx={{ width: 48, height: 48, mb: 2 }} variant="rounded" />

        <Box>
          <Skeleton variant="text" sx={{ height: 28, width: 160 }} />
          <Skeleton variant="text" sx={{ height: 18, width: 180, my: 1 }} />
        </Box>

        <Stack
          spacing={0.5}
          direction="row"
          alignItems="center"
          sx={{ color: 'primary.main', typography: 'caption' }}
        >
          <Skeleton sx={{ width: 16, height: 16 }} variant="rounded" />
          <Skeleton variant="text" sx={{ height: 18, width: 80 }} />
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box>
        <Stack direction="row" spacing={1.5} px={2} py={1.5}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="rounded" width={52} height={28} />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box justifyContent="flex-end" display="flex" px={3} py={2}>
        <Skeleton variant="rounded" sx={{ width: 72, height: 36 }} />
      </Box>
    </Card>
  );
};
