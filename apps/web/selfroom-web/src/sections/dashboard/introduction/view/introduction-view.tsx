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

// ----------------------------------------------------------------------

export default function IntroductionView() {
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
        setMarkdown(`###### ${t(currentLang.label)}に対応したファイルが見つかりません`);
        enqueueSnackbar({
          message: 'ファイルの取得に失敗しました',
          variant: 'error',
        });
      });
  }, [currentLang]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Introduction')}
        links={[{ name: t('Portfolio') }]}
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
