// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import { paths } from '@/routes/paths';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { Request } from '../request/request';
import { useState } from 'react';
import { Response } from '../response/response';
import { MethodKey } from '@/utils/axios';

// ----------------------------------------------------------------------

export type RequestParam = {
  [key: string]: any;
};

export type RequestBody = {
  [key: string]: any;
};

export type RequestHeader = {
  [key: string]: any;
};

export type RequestQuery = {
  dispatch: boolean;
  endpoint: string;
  method: MethodKey;
  param: RequestParam;
  body: RequestBody;
  header: RequestHeader;
};

const defaultRequestQuery: RequestQuery = {
  dispatch: false,
  endpoint: '/',
  method: 'GET',
  param: {},
  body: {},
  header: {},
};

export default function RawApiView() {
  const settings = useSettingsContext();
  const [requestQuery, setRequestQuery] = useState(defaultRequestQuery);
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="RawApi"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'RawApi' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container sx={{ width: '100%' }}>
        <Request setRequestQuery={setRequestQuery} loading={loading} />
        <Response
          loading={loading}
          setLoading={setLoading}
          requestQuery={requestQuery}
          setRequestQuery={setRequestQuery}
        />
      </Container>
    </Container>
  );
}
