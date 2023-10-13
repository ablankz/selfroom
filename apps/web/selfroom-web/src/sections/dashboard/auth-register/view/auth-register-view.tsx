// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { RegisterForm } from '../register-form';
import { paths } from '@/routes/paths';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import Iconify from '@/components/iconify';
import { AUTH_PROVIDERS } from '../../auth-login/auth-providers';
import { Fragment } from 'react';
import { SocialProvider } from '@/types/social-provider';
import { useAuthContext } from '@/auth/hooks';

// ----------------------------------------------------------------------

export default function AuthRegisterView() {
  const { socialLogin } = useAuthContext();
  const settings = useSettingsContext();
  const { t, currentLang } = useLocales();

  const handleSocialLogin = async (provider: SocialProvider) => {
    await socialLogin(provider);
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Authentication')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Authentication'), href: paths.dashboard.auth },
          { name: t('New User') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Box mx={{ sm: 8, md: 18, xl: 40 }} my={8}>
        <RegisterForm />
        <Divider
          sx={{
            my: 5,
          }}
        >
          {t('OR')}
        </Divider>
        <Card sx={{ p: 2 }}>
          {AUTH_PROVIDERS.map((provider) => (
            <Fragment key={provider.value}>
              <Button
                variant="outlined"
                size="large"
                startIcon={
                  <Iconify
                    icon={provider.icon}
                    width={provider.iconWidth}
                    color={provider.iconColor}
                  />
                }
                color={provider.color}
                fullWidth
                onClick={() => handleSocialLogin(provider.value)}
              >
                <Typography
                  variant="button"
                  px={0.5}
                  fontSize={20}
                  width={{ xs: 0.8, sm: 0.6, md: 0.4, lg: 0.38, xl: 0.39 }}
                >
                  {currentLang.value === 'ja'
                    ? provider.jaLabel
                    : provider.label}
                </Typography>
              </Button>
              <Box mt={3} />
            </Fragment>
          ))}
        </Card>
      </Box>
    </Container>
  );
}
