import { SelectChangeEvent, Stack } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { EndpointBase, MethodKey, endpointFilter } from '@/utils/axios';
import { RequestFilter } from '../request';
import { RequestMethodSelector } from './request-method-selector';
import { RequestCandidatesPanel } from './request-candidates-panel';
import { RequestQueryInput } from './request-query-input';
import { RequestQueryButton } from './request-query-button';
import { RequestQuery as RequestQueryType } from '../../view/raw-api-view';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

type RequestMethod = {
  [key in MethodKey]: {
    slug: Method;
    color?: string;
  };
};

export const RequestMethods: RequestMethod = {
  GET: {
    slug: 'get',
    color: '#467a21',
  },
  POST: {
    slug: 'post',
    color: '#ad9c55',
  },
  PUT: {
    slug: 'put',
    color: '#57729c',
  },
  PATCH: {
    slug: 'patch',
    color: '#74579c',
  },
  DELETE: {
    slug: 'delete',
    color: '#7d4665',
  },
} as const;

type Props = {
  filters: RequestFilter;
  setFilters: Dispatch<SetStateAction<RequestFilter>>;
  loading: boolean;
  setRequestQuery: Dispatch<SetStateAction<RequestQueryType>>;
};

export const RequestQuery = ({
  filters,
  setFilters,
  loading,
  setRequestQuery,
}: Props) => {
  const timerRef = useRef<any>(null);
  const [popFlg, setPopFlg] = useState<boolean>(false);
  const [searchRes, setSearchRes] = useState<EndpointBase[]>([]);

  const notFound = !searchRes.length;

  const handleFocus = () => {
    setPopFlg(true);
    clearTimeout(timerRef.current);
  };

  const handleBlur = () => {
    timerRef.current = setTimeout(() => {
      setPopFlg(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const search = endpointFilter(filters.method, filters.name);
    setSearchRes(search);
  }, [filters]);

  const handleFilters = useCallback((name: string, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFilters('name', event.target.value);
      setPopFlg(!!event.target.value);
    },
    [handleFilters]
  );

  const resetFilterName = useCallback(() => {
    handleFilters('name', '');
  }, [handleFilters]);

  const handleFilterRole = useCallback(
    (event: SelectChangeEvent<MethodKey>) => {
      handleFilters('method', event.target.value);
    },
    [handleFilters]
  );

  const handleClick = (key: string) => {
    handleFilters('name', key);
  };

  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row',
      }}
      width="95%"
      spacing={2}
    >
      <RequestMethodSelector
        onFilterRole={handleFilterRole}
        filters={filters}
        loading={loading}
      />

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        flexGrow={1}
        sx={{ width: 1 }}
      >
        <Stack sx={{ position: 'relative' }} spacing={2}>
          <RequestQueryInput
            onBlur={handleBlur}
            onFilterName={handleFilterName}
            onFocus={handleFocus}
            resetFilterName={resetFilterName}
            filters={filters}
            loading={loading}
          />
          {popFlg && (
            <RequestCandidatesPanel
              onClick={handleClick}
              filters={filters}
              searchRes={searchRes}
              notFound={notFound}
              loading={loading}
            />
          )}
        </Stack>

        <RequestQueryButton
          loading={loading}
          filters={filters}
          setRequestQuery={setRequestQuery}
        />
      </Stack>
    </Stack>
  );
};
