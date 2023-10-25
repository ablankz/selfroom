import { Box, Skeleton, Stack } from '@mui/material';

export const TalkSkelton = () => {
  return (
    <Box px={3}>
      {[...Array(10)].map((_, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent={index % 3 ? 'flex-end' : 'unset'}
          sx={{ mb: 5 }}
        >
          {!(index % 3) && (
            <Skeleton variant="circular" width={32} height={32} />
          )}

          <Stack alignItems="flex-end">
            <Skeleton
              variant="text"
              width={70}
              height={20}
              sx={{
                mb: 1,
                color: 'text.disabled',
                ...(!(index % 3) && {
                  mr: 'auto',
                }),
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                position: 'relative',
                ...(!(index % 3) && {
                  mr: 'auto',
                }),
              }}
            >
              <Stack
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  typography: 'body2',
                  bgcolor: 'background.neutral',
                }}
              >
                <Skeleton variant="text" width={120} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
};
