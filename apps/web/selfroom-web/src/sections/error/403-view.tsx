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

// ----------------------------------------------------------------------

export default function View403() {
  const { t } = useLocales();

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          No permission
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {t("The page you're trying access has restricted access.")}
          <br />
          {t('Please refer to your system administrator')}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button component={RouterLink} href="/" size="large" variant="contained">
        {t('Go to Home')}
      </Button>
    </MotionContainer>
  );
}
