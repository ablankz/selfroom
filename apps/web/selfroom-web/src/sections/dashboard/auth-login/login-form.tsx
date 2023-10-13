import { useBoolean } from '@/hooks/use-boolean';
import { useRouter, useSearchParams } from '@/routes/hooks';
import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_AFTER_LOGIN } from '@/config-global';
import { useAuthContext } from '@/auth/hooks';
import {
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { RouterLink } from '@/routes/components';
import { paths } from '@/routes/paths';
import { RHFTextField } from '@/components/hook-form';
import Iconify from '@/components/iconify';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider from '@/components/hook-form/form-provider';
import { useLocales } from '@/locales';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/response/error-response';
import { useSnackbar } from '@/components/snackbar';

export const LoginForm = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const { t, currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    loginId: Yup.string().required(t('Login ID is required')),
    password: Yup.string().required(t('Password is required')),
  });

  const defaultValues = {
    loginId: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await login?.(data.loginId, data.password)
      .then((_) => {
        enqueueSnackbar({
          variant: 'success',
          message: t('Login successfully'),
        });
        router.push(returnTo || PATH_AFTER_LOGIN);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        reset();
        setErrorMsg(t(error.response?.errorMessage || ''));
      });
  });

  const renderJaHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Selfroom</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">アカウントがない場合は</Typography>

        <Link
          component={RouterLink}
          href={paths.dashboard.register}
          variant="subtitle2"
        >
          こちらから
        </Link>
      </Stack>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Selfroom</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link
          component={RouterLink}
          href={paths.dashboard.register}
          variant="subtitle2"
        >
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="loginId" label={t('Login ID')} />

      <RHFTextField
        name="password"
        label={t('Password')}
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t('Login')}
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {currentLang.value === 'ja' ? renderJaHead : renderHead}

      <Alert severity="warning" sx={{ mb: 3 }}>
        {t('dont-handle-forgotten-password')}
      </Alert>

      {renderForm}
    </FormProvider>
  );
};
