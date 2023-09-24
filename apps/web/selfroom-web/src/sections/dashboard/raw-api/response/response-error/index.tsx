import { Stack } from '@mui/material';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';

type Props = {
  error?: Object | any[];
};

export const ResponseError = ({ error }: Props) => {
  return (
    <Stack>
      <JsonView
        data={error || {}}
        shouldExpandNode={allExpanded}
        style={darkStyles}
      />
    </Stack>
  );
};
