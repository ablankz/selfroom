import {
  MotionViewport,
  varTranEnter,
  varTranExit,
} from '@/components/animate';
import Markdown from '@/components/markdown';
import { useSettingsContext } from '@/components/settings';
import { HOST_ASSET } from '@/config-global';
import { useLocales } from '@/locales';
import { Box, Container, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/components/snackbar';

export const LanguageSkill = () => {
  const settings = useSettingsContext();
  const { t, currentLang } = useLocales();
  const [markdown, setMarkdown] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`${HOST_ASSET}/markdown/me/${currentLang.value}/language-skill.md`)
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
    <Container
      sx={{
        width: '100%',
        boxShadow: (theme) =>
          settings.themeMode === 'dark'
            ? theme.customShadows.info
            : theme.customShadows.error,
        borderRadius: 4,
        py: 4,
        my: 4,
      }}
    >
      <Box width={0.95} mb={3}>
        <MotionViewport disableAnimatedMobile={false}>
          <Typography
            component={m.div}
            variant="h4"
            color="text.disabled"
            py={1}
            variants={{
              initial: { backgroundSize: '0% 4px' },
              animate: {
                backgroundSize: '100% 4px',
                transition: varTranEnter({
                  durationIn: 1.2,
                }),
              },
              exit: { backgroundSize: '0% 4px', transition: varTranExit },
            }}
            sx={{
              backgroundImage: (theme) =>
                `linear-gradient(${
                  settings.themeDirection === 'rtl' ? 270 : 90
                }deg, ${theme.palette.background.default}, #00ffff, #99aaff)`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0% 100%',
            }}
          >
            {t('Technologies used')}
          </Typography>
        </MotionViewport>
      </Box>
      <Markdown>{markdown}</Markdown>
    </Container>
  );
};
