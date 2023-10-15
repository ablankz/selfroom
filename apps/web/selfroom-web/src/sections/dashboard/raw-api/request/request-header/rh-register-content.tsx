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
import { useLocales } from '@/locales';

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
  const { t } = useLocales();
  const newCreate = !param;

  const ParamSchema = Yup.object().shape({
    key: Yup.string()
      .required(t('Key is required'))
      .test(
        'already exist key',
        t("It's a Key that already exists"),
        function (this: Yup.TestContext, data: string) {
          return !(
            newCreate && Object.keys(filters.header).some((e) => e === data)
          );
        }
      ),
    value: Yup.string().required(t('Value is required')),
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
    enqueueSnackbar(param ? t('Updated HEADER values') : t('Add BODY value'));
    onClose();
  };

  return (
    <DialogContent>
      <DialogContentText>
        {t('Please enter the HEADER information you wish to add')}
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
            {t('Cancel')}
          </Button>
          <Button color="primary" type="submit">
            {newCreate ? t('Add') : t('Update')}
          </Button>
        </DialogActions>
      </FormProvider>
    </DialogContent>
  );
}
