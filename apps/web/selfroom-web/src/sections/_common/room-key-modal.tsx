// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// hooks
import { useLocales } from '@/locales';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '@/components/hook-form/form-provider';
import { RHFTextField } from '@/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: () => void;
  mutate: (key: string) => void;
  isLoading: boolean;
};

type Param = {
  roomKey: string;
};

export default function RoomKeyModal({ open, handleClose, mutate, isLoading }: Props) {
  const { t } = useLocales();
  const ParamSchema = Yup.object().shape({
    roomKey: Yup.string().required(t('Room key is required')),
  });

  const defaultValues = {
    roomKey: '',
  };

  const methods = useForm<Param>({
    resolver: yupResolver(ParamSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: Param) => {
    mutate(data.roomKey);
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('The room with a key')}</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            {t('To enter this chat room, please enter your room key password.')}
          </Typography>

          <RHFTextField
            name="roomKey"
            label={t('Room Key')}
            autoFocus
            fullWidth
            margin="dense"
            variant="outlined"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            {t('Cancel')}
          </Button>
          <LoadingButton loading={isLoading} type="submit" variant="contained">
            {t('Confirm')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
