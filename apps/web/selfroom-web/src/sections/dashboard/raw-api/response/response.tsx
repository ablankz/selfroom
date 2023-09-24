import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import { QueryContainer } from './query-container';
import { Dispatch, SetStateAction, useState } from 'react';
import { RequestQuery } from '../view/raw-api-view';
import {
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from 'axios';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useResponsive } from '@/hooks/use-responsive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ResponseError } from './response-error';
import { ResponseBody } from './response-body';
import { ResponseHeader } from './response-header';

type Props = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  requestQuery: RequestQuery;
  setRequestQuery: Dispatch<SetStateAction<RequestQuery>>;
};

export type ResponseProps = {
  data?: any;
  statusCode?: number;
  isError: boolean;
  header?: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config?: InternalAxiosRequestConfig<any>;
  statusText?: string;
  request?: any;
  error?: Object | any[];
  responseTime?: number;
  size?: string;
};

export type ErrorProps = {};

type ResponseTab = 'body' | 'headers' | 'error';

export const Response = ({
  loading,
  setLoading,
  requestQuery,
  setRequestQuery,
}: Props) => {
  const isDesktop = useResponsive('up', 'md');
  const [res, setRes] = useState<ResponseProps>({
    isError: false,
  });
  const [value, setValue] = useState<ResponseTab>('body');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue as ResponseTab);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      width={1}
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: 'column',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <Container sx={{ px: 4, py: 1 }}>
        <Typography variant="h4" color="text.disabled">
          Response
        </Typography>
        <Box
          m={1.2}
          p={2}
          borderRadius={2}
          bgcolor={(theme) =>
            theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200'
          }
          sx={{
            ...(res.isError && {
              border: 'solid',
              borderColor: 'error.main',
            }),
          }}
          boxShadow={10}
        >
          <QueryContainer
            setLoading={setLoading}
            requestQuery={requestQuery}
            setRequestQuery={setRequestQuery}
            setRes={setRes}
          >
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                      <Tab label="Body" value="body" />
                      <Tab label="Headers" value="headers" />
                      <Tab label="Error" value="error" />
                    </TabList>
                  </Box>
                  {isDesktop ? (
                    <Box sx={{ mt: 1, mr: 3 }}>
                      <Typography variant="body2" component="span" mx={1}>
                        status:{' '}
                        <Typography
                          variant="body2"
                          color="primary.main"
                          component="span"
                        >
                          {res.statusCode || 0} {res.statusText}
                        </Typography>
                      </Typography>
                      <Typography variant="body2" component="span" mx={1}>
                        time:{' '}
                        <Typography
                          variant="body2"
                          color="primary.main"
                          component="span"
                        >
                          {`${res.responseTime || 0}ms`}
                        </Typography>
                      </Typography>
                      <Typography variant="body2" component="span" mx={1}>
                        size:{' '}
                        <Typography
                          variant="body2"
                          color="primary.main"
                          component="span"
                        >
                          {`${res.size || '0B'}`}
                        </Typography>
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        MenuListProps={{
                          'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem>
                          <Typography variant="body2" component="span" mx={1}>
                            status:{' '}
                            <Typography
                              variant="body2"
                              color="primary.main"
                              component="span"
                            >
                              {res.statusCode || 0} {res.statusText}
                            </Typography>
                          </Typography>
                        </MenuItem>
                        <MenuItem>
                          <Typography variant="body2" component="span" mx={1}>
                            time:{' '}
                            <Typography
                              variant="body2"
                              color="primary.main"
                              component="span"
                            >
                              {`${res.responseTime || 0}ms`}
                            </Typography>
                          </Typography>
                        </MenuItem>
                        <MenuItem>
                          <Typography variant="body2" component="span" mx={1}>
                            size:{' '}
                            <Typography
                              variant="body2"
                              color="primary.main"
                              component="span"
                            >
                              {`${res.size || '0B'}`}
                            </Typography>
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </Box>
                {loading ? (
                  <Skeleton variant="rounded" width={1} height={500} />
                ) : (
                  <>
                    <TabPanel value="body">
                      <ResponseBody data={res.data} />
                    </TabPanel>
                    <TabPanel value="headers">
                      {' '}
                      <ResponseHeader header={res.header} />
                    </TabPanel>
                    <TabPanel value="error">
                      <ResponseError error={res.error} />
                    </TabPanel>
                  </>
                )}
              </TabContext>
            </Box>
          </QueryContainer>
        </Box>
      </Container>
    </Stack>
  );
};
