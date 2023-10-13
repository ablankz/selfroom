// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import SettingForm from '../setting-form';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function SettingView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Setting')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Setting') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <SettingForm />
    </Container>
  );
}
