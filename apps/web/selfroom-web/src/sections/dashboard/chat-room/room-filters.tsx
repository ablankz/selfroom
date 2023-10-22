import { Suspense, useCallback } from 'react';
// @mui
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// components
import Iconify from '@/components/iconify';
import Scrollbar from '@/components/scrollbar';
import { RoomFilter } from '@/api/chat-rooms/useGetChatRoomsQuery';
import {
  CATEGORY_BY_FILTER,
  HAS_KEY_FILTER,
  IS_FAVORITE_FILTER,
  QUERY_TYPE_FILTER,
} from './filters';
import { useLocales } from '@/locales';
import { RoomCategoriesData } from '@/types/response/room-category/room-categories-response';
import { RoomCategoriesAc } from './room-categories-ac';
import { Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: RoomFilter;
  onFilters: (name: keyof RoomFilter, value: any) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
};

export default function RoomFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
}: Props) {
  const { t } = useLocales();
  const handleFilterQueryBy = useCallback(
    (newValue: string) => {
      onFilters('queryBy', newValue);
    },
    [onFilters]
  );

  const handleFilterHasKey = useCallback(
    (newValue: string) => {
      onFilters('hasKey', newValue);
    },
    [onFilters]
  );

  const handleFilterIsFavorite = useCallback(
    (newValue: boolean) => {
      onFilters('isFavorite', newValue);
    },
    [onFilters]
  );

  const handleFilterCategoryBy = useCallback(
    (newValue: string) => {
      onFilters('categoryBy', newValue);
    },
    [onFilters]
  );

  const handleFilterCategories = useCallback(
    (newValue: RoomCategoriesData[]) => {
      onFilters('categories', newValue);
    },
    [onFilters]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {t('Filters')}
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderQueryType = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t('Search Options')}
      </Typography>
      {QUERY_TYPE_FILTER.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Radio
              checked={option.value === filters.queryBy}
              onClick={() => handleFilterQueryBy(option.value)}
            />
          }
          label={t(option.label)}
        />
      ))}
    </Stack>
  );

  const renderHasKey = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t('Room key Option')}
      </Typography>
      {HAS_KEY_FILTER.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Radio
              checked={option.value === filters.hasKey}
              onClick={() => handleFilterHasKey(option.value)}
            />
          }
          label={t(option.label)}
        />
      ))}
    </Stack>
  );

  const renderIsFavorite = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t('Your favorites')}
      </Typography>
      {IS_FAVORITE_FILTER.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Radio
              checked={option.value === filters.isFavorite}
              onClick={() => handleFilterIsFavorite(option.value)}
            />
          }
          label={t(option.label)}
        />
      ))}
    </Stack>
  );

  const renderCategoryBy = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t('Category Option')}
      </Typography>
      {CATEGORY_BY_FILTER.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Radio
              checked={option.value === filters.categoryBy}
              onClick={() => handleFilterCategoryBy(option.value)}
            />
          }
          label={t(option.label)}
        />
      ))}
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        {t('Filters')}
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderQueryType}

            {renderHasKey}
            {renderIsFavorite}

            <Stack>
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                {t('Categories')}
              </Typography>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" width={180} height={40} />
                }
              >
                <RoomCategoriesAc
                  categories={filters.categories}
                  handleCategories={handleFilterCategories}
                />
              </Suspense>
            </Stack>

            {renderCategoryBy}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
