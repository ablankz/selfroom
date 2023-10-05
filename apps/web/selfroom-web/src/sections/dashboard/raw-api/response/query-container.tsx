import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { RequestQuery } from '../view/raw-api-view';
import axios from '@/utils/rawAxios';
import { ResponseProps } from './response';
import { isAxiosError } from 'axios';
import prettyBytes from 'pretty-bytes';
import { useSnackbar } from '@/components/snackbar';

type Props = {
  children: ReactNode;
  setLoading: Dispatch<SetStateAction<boolean>>;
  requestQuery: RequestQuery;
  setRequestQuery: Dispatch<SetStateAction<RequestQuery>>;
  setRes: Dispatch<SetStateAction<ResponseProps>>;
};

export const QueryContainer = ({
  children,
  requestQuery,
  setRequestQuery,
  setLoading,
  setRes,
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (requestQuery.dispatch) {
      (async () => {
        setLoading(true);
        await axios({
          url: requestQuery.endpoint,
          method: requestQuery.method,
          params: requestQuery.param,
          headers: requestQuery.header,
          data: requestQuery.body,
        })
          .then(function (response) {
            const size = prettyBytes(
              JSON.stringify(response.data).length +
                JSON.stringify(response.headers).length
            );
            setRes({
              data: response.data,
              statusCode: response.status,
              isError: false,
              header: response.headers,
              config: response.config,
              statusText: response.statusText,
              request: response.request,
              responseTime: response.responseTime,
              size,
            });
            enqueueSnackbar({
              message: `${response.status} ${response.statusText}`,
              variant: 'success',
            });
          })
          .catch(function (error: Error) {
            const res: ResponseProps = {
              isError: true,
            };
            if (isAxiosError(error)) {
              const size = prettyBytes(
                (JSON.stringify(error.response?.data)?.length || 0) +
                  (JSON.stringify(error.response?.headers)?.length || 0)
              );
              res.data = error.response?.data;
              res.statusCode = error.response?.status;
              res.header = error.response?.headers;
              res.config = error.response?.config;
              res.statusText = error.response?.statusText;
              res.request = error.response?.request;
              res.responseTime = error.response?.responseTime;
              res.size = size;
              res.error = error.toJSON();
              enqueueSnackbar({
                message: `${res.statusCode} ${res.statusText}`,
                variant: 'error',
              });
            } else {
              res.error = error;
              enqueueSnackbar({
                message: `${error.message || '予期せぬエラーです'}`,
                variant: 'error',
              });
            }
            setRes(res);
          });

        setRequestQuery((prev) => ({
          ...prev,
          dispatch: false,
        }));
        setLoading(false);
      })();
    }
  }, [requestQuery.dispatch]);

  return <>{children}</>;
};
