// @mui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
// components
import Iconify from '@/components/iconify';
import { RoomFilter } from '@/api/chat-rooms/useGetChatRoomsQuery';
import { useLocales } from '@/locales';
import {
  CATEGORY_BY_FILTER,
  HAS_KEY_FILTER,
  IS_FAVORITE_FILTER,
  QUERY_TYPE_FILTER,
} from './filters';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: RoomFilter;
  onFilters: (name: keyof RoomFilter, value: any) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function RoomFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const { t } = useLocales();
  const handleRemoveQueryBy = () => {
    onFilters('queryBy', 'name');
  };

  const handleRemoveHasKey = () => {
    onFilters('hasKey', 'all');
  };

  const handleRemoveIsFavorite = () => {
    onFilters('isFavorite', false);
  };

  const handleRemoveCategories = (inputValue: number) => {
    const newValue = filters.categories.filter(
      (item) => item.roomCategoryId !== inputValue
    );
    onFilters('categories', newValue);
  };

  const handleRemoveCategoryBy = () => {
    onFilters('categoryBy', 'any');
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {filters.queryBy !== 'name' && (
          <Block label={`${t('Search Options')}:`}>
            <Chip
              size="small"
              label={t(
                QUERY_TYPE_FILTER.find((e) => e.value === filters.queryBy)
                  ?.label || ''
              )}
              onDelete={handleRemoveQueryBy}
            />
          </Block>
        )}

        {filters.hasKey !== 'all' && (
          <Block label={`${t('Room key Option')}:`}>
            <Chip
              size="small"
              label={t(
                HAS_KEY_FILTER.find((e) => e.value === filters.hasKey)?.label ||
                  ''
              )}
              onDelete={handleRemoveHasKey}
            />
          </Block>
        )}

        {filters.isFavorite && (
          <Block label={`${t('Your favorites')}:`}>
            <Chip
              size="small"
              label={t(
                IS_FAVORITE_FILTER.find((e) => e.value === filters.isFavorite)
                  ?.label || ''
              )}
              onDelete={handleRemoveIsFavorite}
            />
          </Block>
        )}

        {!!filters.categories.length && (
          <Block label={`${t('Categories')}:`}>
            {filters.categories.map((item) => (
              <Chip
                key={item.roomCategoryId}
                label={t(item.name)}
                size="small"
                onDelete={() => handleRemoveCategories(item.roomCategoryId)}
              />
            ))}
          </Block>
        )}

        {filters.categoryBy !== 'any' && (
          <Block label={`${t('Category Option')}:`}>
            <Chip
              size="small"
              label={t(
                CATEGORY_BY_FILTER.find((e) => e.value === filters.categoryBy)
                  ?.label || ''
              )}
              onDelete={handleRemoveCategoryBy}
            />
          </Block>
        )}

        {canReset && (
          <Button
            color="error"
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            {t('Clear')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
