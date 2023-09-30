import { MotionViewport, varFade, varScale } from '@/components/animate';
import Image from '@/components/image';
import TextMaxLine from '@/components/text-max-line';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { Container, Grid, Typography, alpha } from '@mui/material';
import { m } from 'framer-motion';

type Props = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
};

export const WorkImage = (item: Props) => {
  const navigate = useRouter();
  const handleClick = () => {
    navigate.push(paths.dashboard.work(item.id));
  };

  return (
    <>
      <Grid item xs={11} sm={9} md={7} mb={6}>
        <Container
          component={MotionViewport}
          disableAnimatedMobile={false}
          sx={{ height: 1, width: 1, overflow: 'hidden', cursor: 'pointer' }}
          boxShadow={10}
          borderRadius={4}
          p={2}
          onClick={handleClick}
          className='hover-scale hover-scale-md'
        >
          <m.div variants={varScale().inY}>
            <Image
              alt={item.title}
              src={item.coverUrl}
              ratio="16/9"
              sx={{
                borderRadius: 2,
                mb: 3,
                boxShadow: (theme) =>
                  `-40px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`,
              }}
            />
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography
              variant="h6"
              sx={{ textAlign: 'start' }}
              color="primary.main"
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              component={TextMaxLine}
              sx={{ textAlign: 'start' }}
              color="text.disabled"
            >
              {item.description}
            </Typography>
          </m.div>
        </Container>
      </Grid>
    </>
  );
};
