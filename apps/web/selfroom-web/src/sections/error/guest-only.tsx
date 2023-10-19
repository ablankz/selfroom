import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// assets
import { ForbiddenIllustration } from '@/assets/illustrations';
// components
import { RouterLink } from '@/routes/components';
import { MotionContainer, varBounce } from '@/components/animate';
import { useLocales } from '@/locales';
import { PATH_AFTER_LOGIN } from '@/config-global';

// ----------------------------------------------------------------------

type Props = {
  redirectUrl?: string;
}

export default function GuestOnly({redirectUrl}: Props) {
  const { t } = useLocales();

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Guest Only Page
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('Authenticated users cannot view this page')}
          <br />
          {t('You can browse main content')}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button component={RouterLink} href={redirectUrl || PATH_AFTER_LOGIN} size="large" variant="contained">
        {t('Go to Main Content')}
      </Button>
    </MotionContainer>
  );
}
