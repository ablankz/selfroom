// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MinimamLayout({ children }: Props) {
  return (
    <>
      <Container component="main">
        <Stack
          sx={{
            m: 'auto',
            my: 12,
            maxWidth: 400,
            // minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
