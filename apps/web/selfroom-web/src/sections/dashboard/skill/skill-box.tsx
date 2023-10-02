// @mui
// components
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { Box, Card, Typography, useTheme } from '@mui/material';
import ChartRadar from './chart-radar';
import {
  MotionViewport,
  varTranEnter,
  varTranExit,
} from '@/components/animate';
import { m } from 'framer-motion';
import { SkillDescription } from './skill-description';

type SkillLevel = {
  experience: number[];
  knowledge: number[];
  interest: number[];
};

type Props = {
  title: string;
  categories: string[];
  skillLevel: SkillLevel;
  description: string;
};

export const SkillBox = ({
  title,
  categories,
  skillLevel,
  description,
}: Props) => {
  const settings = useSettingsContext();
  const { t, currentLang } = useLocales();
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={1}
      overflow="hidden"
    >
      <Box width={0.95} p={{ xs: 0, sm: 2 }} mb={3}>
        <MotionViewport disableAnimatedMobile={false}>
          <Typography
            component={m.div}
            variant="h4"
            color="text.disabled"
            px={{ xs: 0, sm: 2 }}
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
            {t(title)}
          </Typography>
        </MotionViewport>
      </Box>
      <Card
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
          p: 0.5,
          boxShadow: (theme) =>
            settings.themeMode === 'dark'
              ? theme.customShadows.info
              : theme.customShadows.error,
        }}
        className="scrollbar-none"
      >
        <ChartRadar
          labels={{
            style: {
              colors: theme.palette.secondary.main,
            },
          }}
          categories={categories.map((e) => t(e))}
          series={[
            {
              name: t('experience'),
              data: skillLevel.experience,
            },
            {
              name: t('knowledge'),
              data: skillLevel.knowledge,
            },
            {
              name: t('interest'),
              data: skillLevel.interest,
            },
          ]}
        />
      </Card>
      <Box width={1} p={2} mt={3}>
        <SkillDescription description={t(description)} key={currentLang.value}/>
      </Box>
    </Box>
  );
};
