import { RectangleCardSkelton } from '@/components/application/skelton/rectangle-card-skelton';
import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps{
  skeltonCount?: number; 
}

export const RectangleCardListSkelton = ({sx, skeltonCount = 5}: Props) => {
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
        <RectangleCardSkelton key={index} />
      ))}
    </Box>
  );
};
