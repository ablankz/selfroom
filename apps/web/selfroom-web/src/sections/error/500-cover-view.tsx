import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// assets
import { SeverErrorIllustration } from '@/assets/illustrations';
// components
import { RouterLink } from '@/routes/components';
import { MotionContainer, varBounce } from '@/components/animate';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function Page500Cover() {
  const { t } = useLocales();

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          500 Internal Server Error
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('There was an error, please try again later.')}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button component={RouterLink} href="/" size="large" variant="contained">
        {t('Go to Home')}
      </Button>
    </MotionContainer>
  );
}
