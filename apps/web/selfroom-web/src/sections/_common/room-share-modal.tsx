import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, InputAdornment, TextField, Tooltip } from '@mui/material';
import Iconify from '@/components/iconify';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useCallback } from 'react';
import { useSnackbar } from '@/components/snackbar';
import { useLocales } from '@/locales';

type Props = {
  roomId: string;
  open: boolean;
  handleClose: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}));

export default function RoomShareModal({ roomId, open, handleClose }: Props) {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const onCopy = useCallback(async () => {
    if (await copy(roomId)) {
      enqueueSnackbar({
        message: t('copied'),
        variant: 'success',
      });
    } else {
      enqueueSnackbar({
        message: t('failed-copy'),
        variant: 'error',
      });
    }
  }, [copy, enqueueSnackbar]);

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Chat Room Share</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            my={1}
            p={2}
          >
            <IconButton>
              <Iconify width={72} icon="solar:key-bold" />
            </IconButton>
            <Typography variant="body2" fontSize={18}>
              Twitter
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            my={2}
            p={2}
          >
            <IconButton>
              <Iconify width={72} icon="solar:key-bold" />
            </IconButton>
            <Typography variant="body2" fontSize={18}>
              Twitter
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            my={2}
            p={2}
          >
            <IconButton>
              <Iconify width={72} icon="solar:key-bold" />
            </IconButton>
            <Typography variant="body2" fontSize={18}>
              Twitter
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            my={2}
            p={2}
          >
            <IconButton>
              <Iconify width={72} icon="solar:key-bold" />
            </IconButton>
            <Typography variant="body2" fontSize={18}>
              Twitter
            </Typography>
          </Box>
        </Box>
        <Box p={2}>
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary' }}
            fontSize={20}
          >
            Room ID
          </Typography>

          <TextField
            sx={{
              mt: 2,
            }}
            fullWidth
            defaultValue={roomId}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => onCopy()}>
                      <Iconify icon="eva:copy-fill" width={24} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
