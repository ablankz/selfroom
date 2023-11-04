// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import {
  Box,
  Button,
  Pagination,
  Stack,
  paginationClasses,
} from '@mui/material';
import { RouterLink } from '@/routes/components';
import Iconify from '@/components/iconify';
import { RoomSearch } from '../room-search';
import { useBoolean } from '@/hooks/use-boolean';
import RoomFilters from '../room-filters';
import { ChangeEvent, Suspense, useCallback, useMemo, useState } from 'react';
import {
  RoomFilter,
  RoomSort as SortType,
} from '@/api/chat-rooms/useGetChatRoomsQuery';
import RoomSort from '../room-sort';
import { isEqual } from 'lodash';
import RoomFiltersResult from '../room-filters-result';
import { RoomQueryContainer } from '../room-query-container';
import { RectangleCardListSkelton } from '@/sections/_common/skelton/rectangle-card-list-skelton';

const PER_PAGE = 6;

// ----------------------------------------------------------------------

const defaultFilter: RoomFilter = {
  query: '',
  queryBy: 'name',
  hasKey: 'all',
  isFavorite: false,
  categories: [],
  categoryBy: 'any',
};

const defaultSort: SortType = 'latest';

export default function ChatRoomSearchView() {
  const settings = useSettingsContext();
  const { t } = useLocales();
  const openFilters = useBoolean();
  const [dispatch, setDispatch] = useState(false);

  const [filters, setFilters] = useState<RoomFilter>(defaultFilter);
  const [sort, setSort] = useState<SortType>(defaultSort);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = useCallback(
    (_: ChangeEvent<unknown>, page: number) => {
      setPage(page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const resetPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const pageCount = useMemo(
    () => Math.ceil((totalCount || 0) / PER_PAGE),
    [totalCount]
  );

  const defaultFiltersWithoutQuery = useMemo(() => {
    const { query, ...other } = defaultFilter;
    return other;
  }, [defaultFilter]);

  const canReset = useMemo(() => {
    const { query, ...other } = filters;
    return !isEqual(defaultFiltersWithoutQuery, other);
  }, [filters]);

  const handleFilters = useCallback((name: keyof RoomFilter, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback(
    (inputValue: string) => {
      setFilters((prevState) => ({
        ...prevState,
        query: inputValue,
      }));
    },
    [filters.query]
  );

  const handleResetFilters = useCallback(() => {
    setFilters((prev) => ({
      ...defaultFilter,
      query: prev.query,
    }));
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <RoomSearch
        onSearch={handleSearch}
        filters={filters}
        setDispatch={setDispatch}
        isLoading={isLoading}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <RoomFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
        />

        <RoomSort sort={sort} setSort={setSort} />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <RoomFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={0}
    />
  );

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{ mb: { xs: 2, md: 'auto' } }}
    >
      <CustomBreadcrumbs
        heading={t('Chat')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Chat'), href: paths.dashboard.chat },
          { name: t('Search') },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.chatroom.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t('Create')}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>
      <Box sx={{ typography: 'body2' }}>
        <strong>{totalCount}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          {t('results found')}
        </Box>
      </Box>
      <Suspense fallback={<RectangleCardListSkelton skeltonCount={6} />}>
        <RoomQueryContainer
          filters={filters}
          sort={sort}
          page={page}
          perPage={PER_PAGE}
          dispatch={dispatch}
          totalCount={totalCount}
          setDispatch={setDispatch}
          setTotalCount={setTotalCount}
          resetPage={resetPage}
          setIsLoading={setIsLoading}
        />
        {!!totalCount && (
          <Pagination
            shape="rounded"
            color="primary"
            onChange={handlePageChange}
            count={pageCount}
            page={page}
            sx={{
              mt: 8,
              [`& .${paginationClasses.ul}`]: {
                justifyContent: 'center',
              },
            }}
          />
        )}
      </Suspense>
    </Container>
  );
}
