import * as Yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// utils
import { fData } from '@/utils/format-number';
import { useSnackbar } from '@/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from '@/components/hook-form';
import { useAuthContext } from '@/auth/hooks';
import { useLocales } from '@/locales';
import {
  UserUpdateRequest,
  useUserUpdateQuery,
} from '@/api/users/useUserUpdateQuery';
import { formErrorHandle } from '@/utils/errorHandle/formErrorHandle';
import { ErrorResponse } from '@/types/response/error-response';
import { AxiosError } from 'axios';
import { useUserDeleteQuery } from '@/api/users/useUserDeleteQuery';
import { useBoolean } from '@/hooks/use-boolean';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function SettingForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { mutate, status, error } = useUserUpdateQuery();
  const { mutate: deleteMutate, status: deleteStatus } = useUserDeleteQuery();
  const dialog = useBoolean();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    nickname: Yup.string().required('Name is required'),
    profilePhoto: Yup.mixed<any>().nullable(),
  });

  const defaultValues: UserUpdateRequest = {
    nickname: user?.nickname || '',
    profilePhoto: user?.profilePhotoUrl || null,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('nickname', data.nickname || '');
    if (typeof data.profilePhoto !== 'string' && !!data.profilePhoto) {
      formData.append('profilePhoto', data.profilePhoto);
    }
    mutate(formData);
  });

  const handleDelete = () => {
    deleteMutate();
    dialog.onFalse();
  };

  useEffect(() => {
    if (deleteStatus === 'error' && error instanceof AxiosError) {
      enqueueSnackbar({
        variant: 'error',
        message: t('Account deletion failed'),
      });
    } else if (deleteStatus === 'success') {
      enqueueSnackbar({
        variant: 'success',
        message: t('Account successfully deleted'),
      });
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (status === 'error' && error instanceof AxiosError) {
      error.response?.data &&
        formErrorHandle(error.response.data as ErrorResponse, setError);
      enqueueSnackbar({
        variant: 'error',
        message: t('Failed to update user information'),
      });
    } else if (status === 'success') {
      enqueueSnackbar({
        variant: 'success',
        message: t('Updated user information'),
      });
    }
  }, [status]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profilePhoto', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
              <RHFUploadAvatar
                name="profilePhoto"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <Button
                variant="soft"
                color="error"
                sx={{ mt: 3 }}
                onClick={dialog.onTrue}
              >
                {t('Delete Account')}
              </Button>
            </Card>
          </Grid>

          <Grid xs={12} md={8}>
            <Card sx={{ p: 3, height: 1 }}>
              <Box
                display="flex"
                alignItems="center"
                height={{ xs: 0.5, md: 0.7 }}
              >
                <RHFTextField name="nickname" label={t('Nickname')} />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {t('Save')}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>{t('Delete your account')}</DialogTitle>

        <DialogContent sx={{ color: 'text.secondary' }}>
          {t('account-delete-desscription')}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={dialog.onFalse}>
            {t('Cancel')}
          </Button>
          <Button variant="contained" onClick={handleDelete} autoFocus>
            {t('Confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
