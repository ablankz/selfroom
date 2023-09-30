// @mui
import Box from '@mui/material/Box';
// components
import { Grid, styled } from '@mui/material';
import { WorkImage } from './work-image';

// // ----------------------------------------------------------------------

const StyledWrapper = styled('div')(() => ({
  height: '100%',
  position: 'relative',
}));

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export default function WorkImages({ data }: Props) {
  return (
    <>
      <Box
        py={5}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <StyledWrapper>
          <Grid
            container
            width={1}
            justifyContent="center"
            alignItems="center"
            gap={{
              xs: 1,
              md: 3,
            }}
          >
            {data.map((item) => (
              <WorkImage key={item.id} {...item} />
            ))}
          </Grid>
        </StyledWrapper>
      </Box>
    </>
  );
}
