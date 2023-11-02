import { useMemo } from 'react';
// routes
import { paths } from '@/routes/paths';
// locales
import { useLocales } from '@/locales';
// components
import SvgColor from '@/components/svg-color';
import { GITHUB_LINK, HOST_OPENAPI } from '@/config-global';

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
  works: icon('ic_works'),
  link: icon('ic_link'),
  auth: icon('ic_auth'),
  overview: icon('ic_overview'),
  api: icon('ic_api'),
  chat: icon('ic_chat'),
  openapi: icon('ic_openapi'),
  github: icon('ic_github'),
  drawio: icon('ic_drawio')
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
            title: t('works'),
            path: paths.dashboard.works,
            icon: ICONS.works,
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
            title: t('raw-api'),
            path: paths.dashboard.rawApi,
            icon: ICONS.api,
          },
          {
            title: t('chat'),
            path: paths.dashboard.chat,
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
          {
            title: 'Git Hub',
            path: GITHUB_LINK,
            icon: ICONS.github,
          },
          {
            title: t('Infrastructure Configuration'),
            // 直書きでないとうまくいかないため
            path: 'https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&layers=1&nav=1&title=production.drawio#R7V1tb%2BK4Fv41lXY%2FTBXnnY9A6e5oO1fV9O4dab8gEwxkJsQoCaXdX3%2FtJIbENpACDikJU2nIIbGNn3MeHx8fmztjuHz7I4KrxTc8RcGdrk3f7oyHO10Hhm2S%2F6jkPZO4mpEJ5pE%2FzW%2FaCV78f1Eu1HLp2p%2BiuHRjgnGQ%2BKuy0MNhiLykJINRhDfl22Y4KNe6gnMkCF48GIjSH%2F40WeTfQnd28j%2BRP1%2BwmoHdyz5ZQnZz%2Fk3iBZziTUFkjO6MYYRxkr1bvg1RQDuP9Uv23OOeT%2FOGxck7a2qAvV%2BIfgrujAFrXoTCRFIcnvykvaVrAZwQxNIbIOmr9ClWhe0Cf%2FwX3KDRBps%2Fjb%2BhDXpfdHfb9m2bTmwEeZO3Q%2F4V5fXn%2FfsKg3VeZ%2F%2FHCxEMA7yeCp2ywn6YpDpgDcgfqX%2Bo3VnkkyG9utctTsBfO2UBEK9oGWUBf%2B2UBYAvHnD1A76BBYFwVSpe4%2BrXCg0kf8YAr5PAD9Fway0aEc4jOPUJREMc4IjIQhyS3hsskmWQA7lZ%2BAl6WUGP9uqGWDqRzXCY5PYKdHaddzwtlVhkAkldUV5GigSKRq8oAyS7JwjgKvYn26ci5K2j2H9F31GcFU6lxHZW9P3ybU5p5p6oqnk%2Fj%2FB6lTb%2FK6lL%2BumYvB17VDHGMEhoQUmEfyH2Re90g%2Fx7pNo3mPlBwHXAK4oSn1BBP%2FDntPwE0%2BpgfhWgWVoi6RU%2FnD%2BlVw%2BGlveErIopjBepbWhb26BVoLe7MtXszOW4Bf6B8BIl0Tt5MC%2FGzPkmJ1zg5NebAn25uWxRoC6b3Qhzypxviy6ZbG6mHzBZQxNM9nXlncVfFSsGQsX%2Fex52HNFxRJEjqC7KmMF0XWAqZYZ%2Bf%2BAM3Msxg6EdZAanzAy6LTKDbUiYwbKUMYMpDuav0CdOiR%2F4CW36P7TDyeAuGK0EFQFCYDqjQb%2FYv2AveLxqclBti5KpecEKzgAPHATPMMromSJ4uozWTXXgGRXB67cePL1x2OkCdvDfOkZkS6g3Xk9ClNRRty3U%2FRz5rzChOrqnFZ1r0GrXIKbFES4b725%2BSXmKFbyXtIoMR%2BQj%2B1F%2FdC%2FnOYjkeKbnYB3kLwA4ApO4DlsvochghqaMwRzRmteTwPc6Y%2B6M%2BTLGLJ0BUGPukfm8fcEAAavnOsZs6BWNGRiqjJnRScGYkRd%2F8YJ1TNSkBt%2FAFiMFo2EWVZQ3oYoHa%2FXtoWtfxIPdFqXMg7UPzx0B78L2RKVxHJnSuKqUxhEjwVRpYhS9%2BqR71CuNK2otXPlEkKnOvobcnOpkQOxXHW7magFRdXRZ3AEom%2F64ornjFQo79ET0bLN56ImT1w2a%2FLZEv3fo8VGjXvPQc6W0ncD4Vx2cLQ4aRav%2Fr6wVN6c07uEVpC32TGkk8SogdRCBKqXpiUMtb%2FIddNQtA82D7vhY20FHn7EbB50pRkyzhI0v2RRaPV2bYpTnoKIQIKcQuTPpip7tuWgyO01blGlF1seV5122K2qFJRvAla3mW%2BKaXZp68wMm3uL2rfgIXg6Hlyy4AmRrPadYsSyLi8n0YzgahxO5jpjvSblbhuh8CQoT%2F0JUjzJ0pRFbadRWFrmVRm%2FFCG7ptjSmKqmBF8pkjigE4m0sDCsKZTJZzJl%2FGkieBtzT%2ByO%2B%2B7KVOFp1%2Bn0AbJn5ztIXH75k5vtEVfMZx37ip4HZCU4SvDwaPPUQDRCXjfZYlBnGq%2Bxrzfw32g55qDhCMV5HHsoCxQNyKQsZx8Z5IdjDY73jGPdWiSd0ycRMRhPKomnM2yjY5oshWCfpiKQMSlkdcoqXsL4ALI%2F%2F0p9OaTVS6ibuRji9RGj8CC5umb11SZTTlqCiLDBudoz5aRlz2NMtiYncKmNG01ilaerc9EjmCJuWaJpMdnk%2FWJzXdqbZmWYTTRMFMKbN8xZIpYnywafrm6i4UPD94eW358hfwuj997Z5N%2FzWAEcyN%2B3V6d1YYgbpKFXVIVXV1uJkuMdx2saFagHKruCGoukcMQLDUbLAcxzCYLSTct23u%2BcJU7ZMcfyJkuQ9p0W4TrAsakMrOqW%2FSWtTrjykkHm4MYHRHB3MljDlCEaEahP%2Ftdy%2By9tNhahoyfX40Fi5JwWMG0LT2x%2F2mV7jRk8%2B4wzsG1HXMYqUOrIGy0Nmo6QkkcYVbZvJLm%2FbYjy3dmVyh%2Bbj4%2BPtKVN6W4iS8RwmaAPfleoVt2q7HQ2OxC5sZYOGuNB%2Fk4OGbX%2BKQcMWF%2FM6O7%2BQncPVKiBtoU0cBxhOxxMYwNBLG6DQ4M2SwRuy%2FXy1GrzolvSfBq3z3jlYTIn3XmsMma0Ed4GqzxeoGj04QJNuTrjNQJWnlDHpshvLGmdz62uvuzmynQff20aajssviDrXXnpzxOBh7f7SyAGWM7g9fyk9kmVDE4aIuzRXOt2ukpBj7WihFJdWplpi3LMbkbsRuZkjslLrdE2e92Uby0xJPMxUFQ9zDuc3ak%2BUsNo2PFtlkGRTzW0CYz2js3iQRH4AnMaAGm43Heva1zCmjWofcIADTmJdoNY1P6fC2sXxqGABLxRO%2B%2FSgR8qpNAGdioJJes0QSVGFUcLuyxEkTz76gRx3mktsWgPb3IPVqfFEEakiEuy0hMoRwby4Z%2BofFFjVEuc5%2FH6ujPzzB3eYimVxi5E2Hz7Kwp5CQaSv4XvhttyF2d9mftHT4vONsxJ3mrftwzOU8SIh6k4ZDyqjVgZ2O8B%2FWBP5gniO2qOJl1IWt%2FPaP63X%2FvBgmOawNV67R1s3oysSaLyEIZyjaKw0od3izhYEktSvWtciXMnJgsNvbXP%2FeFh0dv7atYJqrui2H%2BZQFUE1%2BQz%2B0wfVyFR9zM49UKhT%2FI5ESxNN3ZBF01RN2N0GLGx3OnXemqljNUynGpBh1%2BnUWTpl88cOXVunek1YULphnUpPkFGZPs9FKCymKUWF0u7ZNLGWlaTeR%2BeknU41Sqcso3cPnOapVQNygju1Ol2tnJ55bzm93at5GlbBaS8EU8VjaGuLg8qO3LEuExo13PJWAJM%2FtKVqaFQoiMdNcWi0V2VR59bR1PlfaLgYmnxBqtGssipy62jym%2FBORtM5phaq0ayyd2%2BHphfAOPa92wP0YubJF2TxJzcpBnS7MNd2RM1LmShfUP2IVjhLog2IHuXKU0m3fkS7YI%2B67GGW2DU%2B80ebjix0cItnFtsFfyQz0Tig9mfNmYDWRXtuTalsSTp6zUpVYUm2zrGnwo7bLbse3XKbm8y1xjPAH7%2Fe4xYXqo5nfEF27eOZOMP%2Fz9wP3wRVufGMCl07PijUmk8LNHG2%2Fvzn85fZatk6bPizkq%2B98xZoHz2%2BsRuwmzZgm%2FxMwhWD5%2FUO2KDC9L9TqkYrlc0HHNxrTy2AGIF42cD5HEV%2Ff23bOOIYB1fPrr0xGQAxttBKX8xk2zcOUHPNyHRbBD7tFoGWbeydkQkj%2FelrlVmdGsecrph9Xut5sACIeS2PeT%2B0jDsNDXAbr%2B2K58UpZM%2BPbg7o2LNjz5tlT8t2OAttAH%2BKWVst5U%2BL%2FzmC67PnR7csdOzZsefNsqcLGsieYqS%2Bpezp8r8UcXX2ZN%2Bs1TmPpM%2FvXUPbvconmdrs16g%2BnDHHD5Y1p0ACBmaH7gF0T09Xvja6FaJubcieE4CwT8w2EArij2w5GVFyGWGcFG%2BnbsE3PKW%2FXzr6Pw%3D%3D',
            icon: ICONS.drawio,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
