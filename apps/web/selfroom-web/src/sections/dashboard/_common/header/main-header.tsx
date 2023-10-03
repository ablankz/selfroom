import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Stack, { StackProps } from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// theme
import { textGradient } from '@/theme/css';
// components
import { MotionContainer, varFade } from '@/components/animate';
import { useLocales } from '@/locales';
import { StyledRoot } from './styled-root';
import { StyledWrapper } from './styled-wrapper';

// ----------------------------------------------------------------------

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  padding: 0,
  marginTop: 8,
  lineHeight: 1,
  marginBottom: 24,
  letterSpacing: 8,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: `${64 / 16}rem`,
  fontFamily: "'Barlow', sans-serif",
}));

type Props = StackProps & {
  title: string;
  description: string;
};

// ----------------------------------------------------------------------

export default function MainHaeder({ title, description, ...other }: Props) {
  const workRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLocales();
  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (workRef.current) {
      heroHeight = workRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Stack
    className='hover-scale hover-scale-sm'
      alignItems="center"
      justifyContent="center"
      sx={{
        mx: 'auto',
        maxWidth: 480,
        opacity: opacity > 0 ? opacity : 0,
      }}
      {...other}
    >
      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          {title}
        </StyledTextGradient>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {t(description)}
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <>
      <StyledRoot
        py={{
          xs: 10,
          lg: 5,
        }}
        mb={{
          lg: 5,
        }}
        ref={workRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container sx={{ height: 1 }}>
              <Grid xs={12}>{renderDescription}</Grid>
            </Grid>
          </Container>
        </StyledWrapper>
      </StyledRoot>
    </>
  );
}
