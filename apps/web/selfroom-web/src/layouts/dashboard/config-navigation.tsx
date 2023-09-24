import { useMemo } from 'react';
// routes
import { paths } from '@/routes/paths';
// locales
import { useLocales } from '@/locales';
// components
import SvgColor from '@/components/svg-color';

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
  app: icon('ic_app'),
  api: icon('ic_api'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('app'),
            path: paths.dashboard.root,
            icon: ICONS.app,
          },
          {
            title: t('row-api'),
            path: paths.dashboard.rawApi,
            icon: ICONS.api,
          },
        ],
      },

      // ----------------------------------------------------------------------
      {
        subheader: t('auth'),
        items: [],
      },

      {
        subheader: t(t('entity')),
        items: [],
      },
    ],
    [t]
  );

  return data;
}
