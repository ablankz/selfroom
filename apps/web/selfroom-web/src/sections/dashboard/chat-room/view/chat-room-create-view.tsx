// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function ChatRoomCreateView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Chat')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Chat'), href: paths.dashboard.chat },
          { name: t('Create') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container
        sx={{
          width: '100%',
          boxShadow: (theme) => theme.customShadows.primary,
          borderRadius: 4,
          py: 4,
          overflowX: 'auto',
          overflowWrap: 'normal',
        }}
      >
        RoomCreate
      </Container>
    </Container>
  );
}
