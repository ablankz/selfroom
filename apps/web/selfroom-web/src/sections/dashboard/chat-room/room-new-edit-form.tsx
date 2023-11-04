import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useResponsive } from '@/hooks/use-responsive';
// components
import { useSnackbar } from '@/components/snackbar';
import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFSwitch,
} from '@/components/hook-form';
import { RoomCategoriesRHFAc } from './room-categories-rhf-ac';
import { useLocales } from '@/locales';
import { IconButton, InputAdornment } from '@mui/material';
import Iconify from '@/components/iconify';
import { useChatRoomCreateQuery } from '@/api/chat-rooms/useChatRoomCreateQuery';
import { RoomCategory } from '@/types/entity';
import { useRouter } from '@/routes/hooks';
import { AxiosError } from 'axios';
import { formErrorHandle } from '@/utils/errorHandle/formErrorHandle';
import { ErrorResponse } from '@/types/response/error-response';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function RoomNewEditForm() {
  const mdUp = useResponsive('up', 'md');
  const { t } = useLocales();
  const { mutate, data, error, status } = useChatRoomCreateQuery();
  const { enqueueSnackbar } = useSnackbar();
  const password = useBoolean();
  const router = useRouter();

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string().required(t('room-name-required')),
    coverPhoto: Yup.mixed<any>().nullable(),
    categories: Yup.array()
      .min(1, t('Must have at least-categories', { least: 1 }))
      .max(5, t('Maximum number of categories', { maximum: 5 })),
    hasKey: Yup.boolean(),
    roomKey: Yup.string()
      .nullable()
      .test(
        'if_has_key_required',
        t('room-key-required'),
        (value, { parent }) => (parent.hasKey ? !!value : true)
      ),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      coverPhoto: null,
      categories: [],
      hasKey: false,
      roomKey: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('name', data.name || '');
    if (typeof data.coverPhoto !== 'string' && !!data.coverPhoto) {
      formData.append('coverPhoto', data.coverPhoto);
    }
    if (data.hasKey) {
      formData.append('roomKey', data.roomKey || '');
    }
    (data.categories || []).forEach((v: RoomCategory) => {
      // @ts-ignore
      formData.append('categories[]', v.roomCategoryId);
    });
    mutate(formData);
  });

  useEffect(() => {
    if (status === 'error' && error instanceof AxiosError) {
      error.response?.data &&
        formErrorHandle(error.response.data as ErrorResponse, setError);
      enqueueSnackbar({
        variant: 'error',
        message: t('Room creation failed'),
      });
    } else if (status === 'success') {
      enqueueSnackbar({
        variant: 'success',
        message: t('Room successfully created'),
      });
      router.push(
        paths.dashboard.chatroom.profile(data?.data.chatRoomId || '')
      );
    }
  }, [status]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('coverPhoto', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('coverPhoto', null);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t('Setting')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('new-room-setting-description')}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Room Name" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">{t('Cover Photo')}</Typography>
              <RHFUpload
                name="coverPhoto"
                maxSize={10485760}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">{t('Room Key')}</Typography>
              <RHFSwitch name="hasKey" label={t('Required Key')} />
              {values.hasKey && (
                <RHFTextField
                  name="roomKey"
                  label={t('Room Key')}
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
              )}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t('Properties')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('new-room-properties-description')}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RoomCategoriesRHFAc />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {t('Create Room')}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}
