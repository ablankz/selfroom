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
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function AuthOnly() {
  const { t } = useLocales();

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Login User Only Page
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('Users who are not logged in will not be able to view this content')}
          <br />
          {t('Please authenticate at the login screen and visit again')}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button component={RouterLink} href={paths.dashboard.auth} size="large" variant="contained">
        {t('Go to login page')}
      </Button>
    </MotionContainer>
  );
}
