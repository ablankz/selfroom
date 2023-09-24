import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// assets
import { SeverErrorIllustration } from '@/assets/illustrations';
// components
import { RouterLink } from '@/routes/components';
import { MotionContainer, varBounce } from '@/components/animate';
import { FallbackProps } from 'react-error-boundary';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function Page500({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          500 Internal Server Error
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {error.message || 'There was an error, please try again later.'}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Stack spacing={2} direction="row" justifyContent="center">
        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
        >
          Go to Home
        </Button>
        <Button size="large" variant="outlined" onClick={resetErrorBoundary}>
          Retry
        </Button>
      </Stack>
    </MotionContainer>
  );
}
