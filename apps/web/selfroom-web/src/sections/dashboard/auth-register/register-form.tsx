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
import { formErrorHandle } from '@/utils/errorHandle/formErrorHandle';

type FormValues = {
  nickname: string;
  loginId: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { register } = useAuthContext();
  const router = useRouter();
  const { t, currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();
  const passwordConfirm = useBoolean();

  const RegisterSchema = Yup.object().shape({
    nickname: Yup.string().required(t('Nickname is required')),
    loginId: Yup.string().required(t('Login ID is required')),
    password: Yup.string()
      .required(t('Password is required'))
      .min(6, 'Password must have at least 6 characters'),
    confirmPassword: Yup.string()
      .required(t('Password Confirm is required'))
      .oneOf([Yup.ref('password')], 'Must match "password" field value'),
  });

  const defaultValues: FormValues = {
    nickname: '',
    loginId: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await register?.(
      data.loginId,
      data.password,
      data.confirmPassword,
      data.nickname
    )
      .then((_) => {
        enqueueSnackbar({
          variant: 'success',
          message: t('Register successfully'),
        });
        router.push(returnTo || PATH_AFTER_LOGIN);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        error.response?.data
        setValue('password', defaultValues.password);
        setValue('confirmPassword', defaultValues.confirmPassword);
        setErrorMsg(t(error.response?.errorMessage || ''));
        error.response && formErrorHandle<FormValues>(
          error.response.data,
          setError
        );
      });
  });


  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link
          href={paths.dashboard.auth}
          component={RouterLink}
          variant="subtitle2"
        >
          {t('Sign in')}
        </Link>
      </Stack>
    </Stack>
  );

  const renderJaHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">すでにアカウントをお持ちなら</Typography>

        <Link
          href={paths.dashboard.auth}
          component={RouterLink}
          variant="subtitle2"
        >
          こちらから
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="nickname" label={t('Nickname')} />
          <RHFTextField name="loginId" label={t('Login ID')} />
        </Stack>

        <RHFTextField
          name="password"
          label={t("Password")}
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label={t("Password Confirm")}
          type={passwordConfirm.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordConfirm.onToggle} edge="end">
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
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
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {currentLang.value === 'ja' ? renderJaHead : renderHead}

      {renderForm}
    </>
  );
};
