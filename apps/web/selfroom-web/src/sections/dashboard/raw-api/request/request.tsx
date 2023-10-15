import { Box, Card, Stack, Tab, Tabs } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { MethodKey } from '@/utils/rawAxios';
import { RequestQuery } from './request-query';
import {
  RequestBody as RequestBodyType,
  RequestHeader as RequestHeaderType,
  RequestParam,
  RequestQuery as RequestQueryType,
} from '../view/raw-api-view';
import { RequestParams } from './request-param';
import { RequestBody } from './request-body';
import { RequestHeader } from './request-header';

export type RequestFilter = {
  name: string;
  method: MethodKey;
  param: RequestParam;
  body: RequestBodyType;
  header: RequestHeaderType;
};

const defaultFilters: RequestFilter = {
  name: '',
  method: 'GET',
  param: {},
  body: {},
  header: {},
};

type Props = {
  setRequestQuery: Dispatch<SetStateAction<RequestQueryType>>;
  loading: boolean;
};

type QueryTab = 'param' | 'body' | 'header';

export const Request = ({ setRequestQuery, loading }: Props) => {
  const [filters, setFilters] = useState<RequestFilter>(defaultFilters);
  const [value, setValue] = useState<QueryTab>('param');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue as QueryTab);
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: 'column',
      }}
      sx={{
        // p: 2.5,
        // pr: { xs: 2.5, md: 1 },
      }}
    >
      <RequestQuery
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        setRequestQuery={setRequestQuery}
      />

      <Box sx={{ width: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="param" label="Param" />
          <Tab value="body" label="Body" />
          <Tab value="header" label="Header" />
        </Tabs>
        <Card sx={{ boxShadow: 4, my: 4, px: 2, py: 3 }}>
          {value === 'param' && (
            <RequestParams filters={filters} setFilters={setFilters} />
          )}
          {value === 'body' && (
            <RequestBody filters={filters} setFilters={setFilters} />
          )}
          {value === 'header' && (
            <RequestHeader filters={filters} setFilters={setFilters} />
          )}
        </Card>
      </Box>
    </Stack>
  );
};
