// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import Markdown from '@/components/markdown';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { HOST_ASSET } from '@/config-global';
import { useSnackbar } from '@/components/snackbar';
import MainHaeder from '../../_common/header/main-header';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function ChatView() {
  const settings = useSettingsContext();
  const { t, currentLang } = useLocales();
  const [markdown, setMarkdown] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`${HOST_ASSET}/markdown/me/${currentLang.value}/introduction.md`)
      .then((m) => {
        setMarkdown(m.data);
      })
      .catch((_: AxiosError) => {
        setMarkdown(``);
        enqueueSnackbar({
          message: `${t('Failed to retrieve file')}`,
          variant: 'error',
        });
      });
  }, [currentLang]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Chat')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Chat') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <MainHaeder title='PROFILE' description='profile-description' />
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
        <Markdown>{markdown}</Markdown>
      </Container>
    </Container>
  );
}
