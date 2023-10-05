import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// routes
import { RouterLink } from '@/routes/components';
// components
import { MotionContainer, varBounce } from '@/components/animate';
// assets
import { PageNotFoundIllustration } from '@/assets/illustrations';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const { t } = useLocales();

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Sorry, Page Not Found!
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {t(
            "Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Besure to check your spelling."
          )}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <PageNotFoundIllustration
          sx={{
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </m.div>

      <Button component={RouterLink} href="/" size="large" variant="contained">
        {t('Go to Home')}
      </Button>
    </MotionContainer>
  );
}
