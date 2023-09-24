import merge from 'lodash/merge';
import {
  ja as jaJPAdapter,
  enUS as enUSAdapter,
} from 'date-fns/locale';
// core
import {
  jaJP as jaJPCore,
  enUS as enUSCore,
} from '@mui/material/locale';
// date-pickers
import {
  jaJP as jaJPDate,
  enUS as enUSDate,
} from '@mui/x-date-pickers/locales';
// data-grid
import {
  jaJP as jaJPDataGrid,
  enUS as enUSDataGrid,
} from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'Japanese',
    value: 'ja',
    systemValue: merge(jaJPDate, jaJPDataGrid, jaJPCore),
    adapterLocale: jaJPAdapter,
    icon: 'flagpack:jp',
  },
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
];

export const defaultLang = allLangs[0]; // Japanese

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
