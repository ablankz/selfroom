import { format, getTime, formatDistanceToNow, Locale } from 'date-fns';
import { ja, enUS } from 'date-fns/locale';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

type LocaleMapping = {
  [key in string]: Locale;
};

export const TIME_LOCALE_MAPPING: LocaleMapping = {
  ja,
  en: enUS,
} as const;

export function fDate(
  date: InputValue,
  newFormat?: string,
  locale?: keyof typeof TIME_LOCALE_MAPPING
) {
  const fm = newFormat || 'dd MMM yyyy';

  return date
    ? format(new Date(date), fm, {
        locale: TIME_LOCALE_MAPPING[locale || 'en'],
      })
    : '';
}

export function fDateTime(
  date: InputValue,
  newFormat?: string,
  locale?: keyof typeof TIME_LOCALE_MAPPING
) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date
    ? format(new Date(date), fm, {
        locale: TIME_LOCALE_MAPPING[locale || 'en'],
      })
    : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(
  date: InputValue,
  locale?: keyof typeof TIME_LOCALE_MAPPING
) {
  return date
    ? formatDistanceToNow(new Date(date), {
        locale: TIME_LOCALE_MAPPING[locale || 'en'],
        addSuffix: true,
      })
    : '';
}
