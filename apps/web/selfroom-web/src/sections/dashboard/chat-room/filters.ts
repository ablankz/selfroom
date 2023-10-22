type FilterValue = {
  value: any;
  label: string;
};

export const QUERY_TYPE_FILTER: FilterValue[] = [
  {
    value: 'name',
    label: 'name-query-type',
  },
  {
    value: 'id',
    label: 'id-query-type',
  },
];

export const HAS_KEY_FILTER: FilterValue[] = [
  {
    value: 'all',
    label: 'all-has-key',
  },
  {
    value: 'true',
    label: 'true-has-key',
  },
  {
    value: 'false',
    label: 'false-has-key',
  },
];

export const IS_FAVORITE_FILTER: FilterValue[] = [
  {
    value: false,
    label: 'false-is-favorite',
  },
  {
    value: true,
    label: 'true-is-favorite',
  },
];

export const CATEGORY_BY_FILTER: FilterValue[] = [
  {
    value: 'any',
    label: 'any-category-by',
  },
  {
    value: 'all',
    label: 'all-category-by',
  },
];
