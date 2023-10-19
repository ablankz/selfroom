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
import { useCallback, useMemo } from 'react';
import { useSnackbar } from '@/components/snackbar';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { HOST } from '@/config-global';
import { useAuthContext } from '@/auth/hooks';
import {
  FacebookShareButton,
  EmailShareButton,
  LineShareButton,
  TwitterShareButton,
} from 'react-share';

type Props = {
  roomId: string;
  roomName: string;
  open: boolean;
  handleClose: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}));

export default function RoomShareModal({
  roomId,
  roomName,
  open,
  handleClose,
}: Props) {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { user } = useAuthContext();
  const sendMsg = useMemo(
    () => ({
      url: `${HOST}/${paths.dashboard.chatroom.profile(roomId)}`,
      mailTitle: t("invite-mail-title"),
      title: `${t('invite-room-key-1', {
        userName: user?.nickname || 'unknown',
        roomName,
      })}\n${t('invite-room-key-2')}\n`,
    }),
    [t]
  );
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
            my={2}
            p={2}
          >
            <FacebookShareButton url={sendMsg.url} quote={sendMsg.title}>
              <IconButton>
                <Iconify width={72} icon="ic:baseline-facebook" />
              </IconButton>
            </FacebookShareButton>
            <Typography variant="body2" fontSize={18}>
              Facebook
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            my={2}
            p={2}
          >
            <TwitterShareButton {...sendMsg}>
              <IconButton>
                <Iconify width={72} icon="fa6-brands:x-twitter" />
              </IconButton>
            </TwitterShareButton>
            <Typography variant="body2" fontSize={18}>
              &#x1D54F; (Twitter)
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            my={2}
            p={2}
          >
            <LineShareButton {...sendMsg}>
              <IconButton>
                <Iconify width={72} icon="bi:line" />
              </IconButton>
            </LineShareButton>
            <Typography variant="body2" fontSize={18}>
              Line
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            my={2}
            p={2}
          >
            <EmailShareButton
              url={sendMsg.url}
              subject={sendMsg.mailTitle}
              body={sendMsg.title}
            >
              <IconButton>
                <Iconify width={72} icon="ic:baseline-email" />
              </IconButton>
            </EmailShareButton>
            <Typography variant="body2" fontSize={18}>
              Email
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
