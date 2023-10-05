import {
  Avatar,
  Link,
  ListItem,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { EndpointBase } from '@/utils/rawAxios';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { RequestFilter } from '../request';
import { RequestMethods } from '.';

type Props = {
  onClick: (key: string) => void;
  url: EndpointBase;
  filters: RequestFilter;
};

export const RequestCandidate = ({ url, onClick, filters }: Props) => {
  const theme = useTheme();
  const key = `${url.urlKey}.${url.method}`;
  const matches = match(url.urlKey, filters.name);
  const parts = parse(url.urlKey, matches);

  return (
    <Tooltip title={url.urlKey} sx={{zIndex: 9999}}>
      <ListItem
        key={key}
        onClick={() => onClick(url.urlKey)}
        sx={{
          cursor: 'pointer',
          backgroundColor: theme.palette.background.default,
          boxShadow: theme.shadows[2],
          borderRadius: 3,
          ':hover': {
            backgroundColor: theme.palette.background.neutral,
            boxShadow: theme.shadows[16],
          },
        }}
      >
        <Avatar
          sizes=""
          key={key}
          variant="rounded"
          sx={{
            width: 32,
            height: 32,
            flexShrink: 0,
            mr: 1.5,
            borderRadius: 1,
            bgcolor: RequestMethods[url.method].color || 'orange',
          }}
        >
          <Typography
            variant="caption"
            component="span"
            sx={{
              fontSize: 1.2,
            }}
          >
            {url.method}
          </Typography>
        </Avatar>
        <Link
          key={filters.name}
          underline="none"
          sx={{ ml: 0.8 }}
          overflow="hidden"
        >
          {parts.map((part, index) => (
            <Typography
              key={index}
              component="span"
              color={part.highlight ? 'primary' : 'textPrimary'}
              sx={{
                typography: 'body2',
                fontWeight: part.highlight
                  ? 'fontWeightSemiBold'
                  : 'fontWeightMedium',
              }}
            >
              {part.text}
            </Typography>
          ))}
          <br />
          <Typography
            sx={{ ml: 0.4 }}
            variant="caption"
            component="span"
            color="text.disabled"
          >
            {url.comment}
          </Typography>
        </Link>
      </ListItem>
    </Tooltip>
  );
};
