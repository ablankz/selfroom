import { Stack } from '@mui/material';
import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';

type Props = {
  header?: RawAxiosResponseHeaders | AxiosResponseHeaders;
};

export const ResponseHeader = ({ header = {} }: Props) => {
  return (
    <Stack>
      <JsonView
        data={header}
        shouldExpandNode={allExpanded}
        style={darkStyles}
      />
    </Stack>
  );
};
