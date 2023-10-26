// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { RouterLink } from '@/routes/components';
import { Button } from '@mui/material';
import Iconify from '@/components/iconify';
import RoomNewEditForm from '../room-new-edit-form';

// ----------------------------------------------------------------------

export default function ChatRoomCreateView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{ mb: { xs: 2, md: 'auto' } }}
    >
      <CustomBreadcrumbs
        heading={t('Chat')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Chat'), href: paths.dashboard.chat },
          { name: t('Create') },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.chatroom.search}
            variant="contained"
            startIcon={<Iconify icon="material-symbols:search" />}
          >
            {t('Search')}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <RoomNewEditForm />
    </Container>
  );
}
