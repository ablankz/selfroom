// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// hooks
import { useLocales } from '@/locales';
import { useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: () => void;
  setKey: (key: string) => void;
};

export default function RoomKeyModal({ open, handleClose, setKey }: Props) {
  const { t } = useLocales();
  const [value, setValue] = useState('');

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('The room with a key')}</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3 }}>
          {t('To enter this chat room, please enter your room key password.')}
        </Typography>

        <TextField
          autoFocus
          fullWidth
          margin="dense"
          variant="outlined"
          label="Room Key"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          {t('Cancel')}
        </Button>
        <Button onClick={() => setKey(value)} variant="contained">
          {t('Confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
