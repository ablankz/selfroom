// @mui
import Container from '@mui/material/Container';
// components
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/components/snackbar';
import { Work } from '@/pages/dashboard/works-detail';
import axios, { AxiosError } from 'axios';
import { HOST_ASSET } from '@/config-global';
import Markdown from '@/components/markdown';
import { Stack, Typography } from '@mui/material';
import WorksDetailHero from '../works-detail-hero';

type Props = {
  work: Work;
};

// ----------------------------------------------------------------------

export default function WorksDetailView({ work }: Props) {
  const { t, currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    axios
      .get(`${HOST_ASSET}/markdown/works/${currentLang.value}/${work.id}.md`)
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
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        heading={t('Works')}
        links={[
          { name: t('Portfolio'), href: paths.dashboard.root },
          { name: t('Works'), href: paths.dashboard.works },
          { name: t(work.title) },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
       <WorksDetailHero work={work} />
      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {work.description}
        </Typography>
        <Markdown>{markdown}</Markdown>
      </Stack>
    </Container>
  );
}
