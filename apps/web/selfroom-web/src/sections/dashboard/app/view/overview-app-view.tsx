// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t("Overview")}
        links={[{ name: t('Application') }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Grid container spacing={3}>
        hello
      </Grid>
    </Container>
  );
}
