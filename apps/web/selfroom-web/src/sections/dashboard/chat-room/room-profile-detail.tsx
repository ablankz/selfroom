import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useLocales } from '@/locales';
import { ChatRoomCard } from '@/types/entity';
import {
  Box,
  Divider,
  IconButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { useSnackbar } from '@/components/snackbar';
import Iconify from '@/components/iconify';
import { fDate } from '@/utils/format-time';

type Props = {
  data: ChatRoomCard;
};

export const RoomProfileDetail = ({ data }: Props) => {
  const { name, chatRoomId, updatedAt, favorNum, userNum } = data;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { copy } = useCopyToClipboard();

  const onCopy = useCallback(async () => {
    if (await copy(chatRoomId)) {
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
    <Stack
      spacing={2}
      sx={{
        pt: 3,
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 3, md: 0 },
      }}
    >
      <Stack spacing={1.5} alignItems="flex-start">
        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
          }}
          primary={name}
          secondary={
            <Typography
              fontSize={16}
              onClick={() => onCopy()}
              sx={{
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
              color={'text.disabled'}
            >
              {chatRoomId}
              <IconButton>
                <Iconify icon="eva:copy-fill" width={24} />
              </IconButton>
            </Typography>
          }
          primaryTypographyProps={{
            typography: 'h3',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'h4',
            sx: { opacity: 0.48 },
          }}
        />
      </Stack>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
    >
      {[
        {
          label: 'Available',
          value: `${fDate(updatedAt)}`,
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Contact name',
          value: 'Hello World',
          icon: <Iconify icon="solar:user-rounded-bold" />,
        },
        {
          label: 'Durations',
          value: userNum,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Contact phone',
          value: favorNum,
          icon: <Iconify icon="solar:phone-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Box>
      <Divider sx={{ borderStyle: 'dashed' }} />
      Categories
    </Stack>
  );
};
