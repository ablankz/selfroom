// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import ProfileForm from '../setting-form';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function ProfileView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Profile')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Profile') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ProfileForm />
    </Container>
  );
}
