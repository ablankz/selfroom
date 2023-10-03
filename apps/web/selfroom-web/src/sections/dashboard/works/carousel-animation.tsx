import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// theme
// components
import Image from '@/components/image';
import { MotionContainer, varFade } from '@/components/animate';
import Carousel, {
  CarouselArrowIndex,
  useCarousel,
} from '@/components/carousel';
import { useEffect } from 'react';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export default function CarouselAnimation({ data }: Props) {
  const theme = useTheme();

  const carousel = useCarousel({
    speed: 1200,
    autoplay: true,
  });

  useEffect(() => {
    if (theme.direction === 'rtl') carousel.onTogo(0);
  }, []);

  return (
    <Card sx={{ width: { xs: 0.7, xl: 0.6 } }}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            item={item}
            active={index === carousel.currentIndex}
          />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={data.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
  };
  active: boolean;
};

function CarouselItem({ item, active }: CarouselItemProps) {
  const theme = useTheme();

  const { coverUrl, title } = item;
  const { t } = useLocales();

  const navigate = useRouter();

  const handleClick = () => {
    navigate.push(paths.dashboard.work(item.id));
  };

  const variants =
    theme.direction === 'rtl' ? varFade().inLeft : varFade().inRight;

  return (
    <Paper sx={{ position: 'relative' }}>
      <Image dir="ltr" alt={title} src={coverUrl} ratio="16/9"/>

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          background: `linear-gradient(to top, rgba(22, 28, 36, 1) 0%, rgba(22, 28, 36, 0) 100%)`,
        }}
      />

      <CardContent
        component={MotionContainer}
        animate={active}
        action
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: {
            xs: 560,
            xl: 680
          },
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          pr: 10,
        }}
      >
        <m.div variants={variants}>
          <Typography variant="h3" gutterBottom>
            {item.title}
          </Typography>
        </m.div>

        <m.div variants={variants}>
          <Typography variant="body2" noWrap gutterBottom>
            {item.description}
          </Typography>
        </m.div>

        <m.div variants={variants}>
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleClick}>
            {t('View More')}
          </Button>
        </m.div>
      </CardContent>
    </Paper>
  );
}
