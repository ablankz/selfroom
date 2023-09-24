import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useSnackbar } from '@/components/snackbar';
import { RequestFilter } from '../request';

type Param = {
  key: string;
  value: string;
};

type Props = {
  param?: Param;
  onClose: () => void;
  setFilters: Dispatch<SetStateAction<RequestFilter>>;
  filters: RequestFilter;
};

export default function RHRegisterContent({
  param,
  onClose,
  setFilters,
  filters,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const newCreate = !param;

  const ParamSchema = Yup.object().shape({
    key: Yup.string()
      .required('Keyは必須です')
      .test(
        'already exist key',
        'すでに存在しているKeyです.',
        function (this: Yup.TestContext, data: string) {
          return !(
            newCreate && Object.keys(filters.header).some((e) => e === data)
          );
        }
      ),
    value: Yup.string().required('Valueは必須です'),
  });

  const defaultValues = useMemo(
    () => ({
      key: param?.key || '',
      value: param?.value || '',
    }),
    [param]
  );

  const methods = useForm<Param>({
    resolver: yupResolver(ParamSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: Param) => {
    setFilters((prev) => {
      return {
        ...prev,
        header: {
          ...prev.header,
          [data.key]: data.value,
        },
      };
    });
    reset();
    enqueueSnackbar(
      param ? 'リクエストヘッダーを更新しました' : 'リクエストヘッダーを追加しました'
    );
    onClose();
  };

  return (
    <DialogContent>
      <DialogContentText>
        追加するリクエストヘッダー情報を入力してください。
      </DialogContentText>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          mx={3}
          my={2}
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFTextField name="key" label="Key" disabled={!newCreate} />
          <RHFTextField name="value" label="Value" />
        </Box>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {newCreate ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </FormProvider>
    </DialogContent>
  );
}
