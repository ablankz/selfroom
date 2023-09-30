// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import Markdown from '@/components/markdown';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { HOST_ASSET } from '@/config-global';
import { useSnackbar } from '@/components/snackbar';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const settings = useSettingsContext();
  const { t, currentLang } = useLocales();
  const [markdown, setMarkdown] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`${HOST_ASSET}/markdown/app/${currentLang.value}/overview.md`)
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
        heading={t("Overview")}
        links={[{ name: t('Application') }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
       <Container sx={{ width: '100%', boxShadow: 8, borderRadius: 4, py: 4, overflow: "visible", overflowWrap: "normal" }}>
        <Markdown>{markdown}</Markdown>
      </Container>
    </Container>
  );
}
