// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { Box } from '@mui/material';
import MainHaeder from '../../_common/header/main-header';
import { SkillBox } from '../skill-box';
import { LanguageSkill } from '../language-skill';
import { Qualification } from '../qualification';

// ----------------------------------------------------------------------

export default function SkillView() {
  const settings = useSettingsContext();
  const { t } = useLocales();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Skill-Qualification')}
        links={[
          { name: t('Portfolio'), href: paths.dashboard.root },
          { name: t('Skill-Qualification') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <MainHaeder title="SKILL" description="skill-description" />
      <Container
        sx={{
          my: 3,
          py: 4,
          bgcolor: 'background.paper',
          borderRadius: 0.8,
          width: 1,
        }}
      >
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          width={1}
        >
          <SkillBox
            title="development"
            categories={[
              'System',
              'Application',
              'Web (front-end)',
              'Web (back-end)',
              'Embedded',
            ]}
            skillLevel={{
              experience: [10, 40, 70, 90, 0],
              knowledge: [40, 60, 75, 90, 20],
              interest: [80, 100, 60, 20, 95],
            }}
            description="skill-development-description"
          />
          <SkillBox
            title="infrastructure"
            categories={['Server', 'Network', 'Security', 'Databse', 'Cloud']}
            skillLevel={{
              experience: [85, 50, 40, 60, 50],
              knowledge: [72, 68, 40, 35, 72],
              interest: [70, 70, 90, 82, 90],
            }}
            description="skill-infrastructure-description"
          />
          <SkillBox
            title="Others"
            categories={[
              'Testing and Debugging',
              'Design',
              'Communication',
              'English',
              'Software Design',
              'Development method',
            ]}
            skillLevel={{
              experience: [10, 20, 30, 30, 60, 20],
              knowledge: [5, 10, 10, 50, 60, 40],
              interest: [40, 90, 70, 65, 60, 30],
            }}
            description="skill-others-description"
          />
        </Box>
        <LanguageSkill />
        <Qualification />
      </Container>
    </Container>
  );
}
