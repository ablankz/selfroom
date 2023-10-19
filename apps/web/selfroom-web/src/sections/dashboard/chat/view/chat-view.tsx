// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { useRouter } from '@/routes/hooks';

// ----------------------------------------------------------------------

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(
    theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.light
  ),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function ChatView() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const { t } = useLocales();
  const router = useRouter();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Chat')}
        links={[
          { name: t('Application'), href: paths.dashboard.overview },
          { name: t('Chat') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: { xs: 0.95, md: 0.75 },
          height: 800,
          bgcolor:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.darker
              : theme.palette.primary.lighter,
          borderRadius: 3,
          boxShadow: theme.shadows[12],
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={0.45}
          width={1}
        >
          <ColorButton
            size="large"
            variant="contained"
            sx={{
              p: { xs: 2, sm: 6 },
            }}
            onClick={() => router.push(paths.dashboard.chatroom.search)}
          >
            <Typography
              fontSize={{ xs: 24, sm: 36 }}
              variant="button"
              fontFamily="Rampart One"
            >
              {t('Find a Room')}
            </Typography>
          </ColorButton>
        </Box>
        <Divider
          sx={{
            borderStyle: 'inset',
            width: 0.95,
            borderBlockWidth: 10,
            borderRadius: 999,
            borderColor: theme.palette.primary.darker,
            borderInlineStyle: 'double',
            borderTopColor: theme.palette.primary.light,
            my: 3,
          }}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={0.45}
          width={1}
        >
          <ColorButton
            size="large"
            variant="contained"
            sx={{
              p: { xs: 2, sm: 6 },
            }}
            onClick={() => router.push(paths.dashboard.chatroom.create)}
          >
            <Typography
              fontSize={{ xs: 24, sm: 36 }}
              variant="button"
              fontFamily="Rampart One"
            >
              {t('Create a Room')}
            </Typography>
          </ColorButton>
        </Box>
      </Container>
    </Container>
  );
}
