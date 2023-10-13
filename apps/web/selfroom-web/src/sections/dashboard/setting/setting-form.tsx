import * as Yup from 'yup';
import { useCallback } from 'react';
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

// ----------------------------------------------------------------------

type FormValues = {
  nickname: string;
  profilePhoto: any;
};

export default function SettingForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const { user } = useAuthContext();

  const UpdateUserSchema = Yup.object().shape({
    nickname: Yup.string().required('Name is required'),
    profilePhoto: Yup.mixed<any>().nullable(),
  });

  const defaultValues: FormValues = {
    nickname: user?.nickname || '',
    profilePhoto: user?.profilePhotoUrl || null,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // await axi?.(
    //   data.loginId,
    //   data.password,
    //   data.confirmPassword,
    //   data.nickname
    // )
    //   .then((_) => {
    //     enqueueSnackbar({
    //       variant: 'success',
    //       message: t('Register successfully'),
    //     });
    //     router.push(returnTo || PATH_AFTER_LOGIN);
    //   })
    //   .catch((error: AxiosError<ErrorResponse>) => {
    //     error.response?.data;
    //     setValue('password', defaultValues.password);
    //     setValue('confirmPassword', defaultValues.confirmPassword);
    //     setErrorMsg(t(error.response?.errorMessage || ''));
    //     error.response &&
    //       formErrorHandle<FormValues>(error.response.data, setError);
    //   });
  });

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

            <Button variant="soft" color="error" sx={{ mt: 3 }}>
              Delete User
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
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
