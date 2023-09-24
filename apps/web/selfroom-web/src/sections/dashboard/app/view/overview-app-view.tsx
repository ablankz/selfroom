// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="App"
        links={[{ name: 'Dashboard' }]}
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
