import { useLocales } from '@/locales';
import { SkillView } from '@/sections/dashboard/skill/view';
import { Helmet } from 'react-helmet-async';
// sections

// ----------------------------------------------------------------------

export default function SkillPage() {
  const { t } = useLocales();

  return (
    <>
      <Helmet>
        <title> {t('Portfolio')}: {t('Skill-Qualification')}</title>
      </Helmet>

      <SkillView />
    </>
  );
}
