import Scrollbar from '@/components/scrollbar';
import SearchNotFound from '@/components/search-not-found';
import { EndpointBase } from '@/utils/axios';
import { Card, Stack, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { RequestCandidate } from './request-candidate';
import { RequestFilter } from '../request';

type Props = {
  filters: RequestFilter;
  searchRes: EndpointBase[];
  notFound: boolean;
  onClick: (key: string) => void;
  loading: boolean;
};

export const RequestCandidatesPanel = ({
  filters,
  searchRes,
  notFound,
  onClick,
}: Props) => {
  const theme = useTheme();
  const renderItem = (url: EndpointBase) => {
    return <RequestCandidate url={url} onClick={onClick} filters={filters} key={`${url.urlKey}.${url.method}`}/>;
  };

  return (
    <Card
      component={m.div}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.8 },
      }}
      animate={{
        scale: [1, 1.005, 1.01, 1.005, 1],
        opacity: [0, 0.2, 0.3, 0.8, 1.0],
        transition: { duration: 0.3 },
      }}
      sx={{
        width: '100%',
        maxWidth: '100%',
        position: 'absolute',
        top: 60,
        boxShadow: theme.shadows[16],
        zIndex: 999,
        py: 1
      }}
    >
      <Scrollbar sx={{ p: 3, pt: 2, maxHeight: 400 }}>
        {notFound ? (
          <SearchNotFound query={filters.name} />
        ) : (
          <Stack p={0.5} spacing={2}>
            {searchRes.map((url) => renderItem(url))}
          </Stack>
        )}
      </Scrollbar>
    </Card>
  );
};
