import { MiniCardSkelton } from '@/components/application/skelton/mini-card-skelton';
import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps{
  skeltonCount?: number; 
}

export const MiniCardListSkelton = ({sx, skeltonCount = 5}: Props) => {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      sx={sx}
    >
      {[...Array(skeltonCount)].map((_, index) => (
        <MiniCardSkelton key={index} />
      ))}
    </Box>
  );
};
