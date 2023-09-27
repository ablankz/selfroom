import { useMemo } from 'react';
// routes
import { paths } from '@/routes/paths';
// locales
import { useLocales } from '@/locales';
// components
import SvgColor from '@/components/svg-color';
import { HOST_OPENAPI } from '@/config-global';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  introduction: icon('ic_introduction'),
  career: icon('ic_career'),
  skill: icon('ic_skill'),
  work: icon('ic_work'),
  link: icon('ic_link'),
  auth: icon('ic_auth'),
  overview: icon('ic_overview'),
  api: icon('ic_api'),
  chat: icon('ic_chat'),
  openapi: icon('ic_openapi'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('portfolio'),
        items: [
          {
            title: t('introduction'),
            path: paths.dashboard.root,
            icon: ICONS.introduction,
          },
          {
            title: t('career'),
            path: paths.dashboard.career,
            icon: ICONS.career,
          },
          {
            title: t('skill-qualification'),
            path: paths.dashboard.skill,
            icon: ICONS.skill,
          },
          {
            title: t('work'),
            path: paths.dashboard.work,
            icon: ICONS.work,
          },
          {
            title: t('link'),
            path: paths.dashboard.link,
            icon: ICONS.link,
          },
        ],
      },
      {
        subheader: t('application'),
        items: [
          {
            title: t('overview'),
            path: paths.dashboard.overview,
            icon: ICONS.overview,
          },
          {
            title: t('auth'),
            path: paths.dashboard.auth,
            icon: ICONS.auth,
          },
          {
            title: t('row-api'),
            path: paths.dashboard.rawApi,
            icon: ICONS.api,
          },
          {
            title: t('chat'),
            path: paths.dashboard.rawApi,
            icon: ICONS.chat,
          },
        ],
      },

      // ----------------------------------------------------------------------

      {
        subheader: t('external'),
        items: [
          {
            title: t('APIDesignDocument'),
            path: HOST_OPENAPI,
            icon: ICONS.openapi,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
