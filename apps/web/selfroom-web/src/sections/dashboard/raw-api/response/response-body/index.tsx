import { Stack } from '@mui/material';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';

type Props = {
  data?: any;
};

export const ResponseBody = ({ data = {} }: Props) => {
  return (
    <Stack>
      <JsonView data={data} shouldExpandNode={allExpanded} style={darkStyles} />
    </Stack>
  );
};
