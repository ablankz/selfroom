import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from '@/routes/paths';
import { useRouter } from '@/routes/hooks';
//
import { useAuthContext } from '../hooks';
import MinimamLayout from '@/layouts/minimam-layout';
import AuthOnly from '@/sections/error/auth-only';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { authenticated } = useAuthContext();

  const [auth, setAuth] = useState(false);

  const check = useCallback(() => {
    setAuth(authenticated);
  }, [authenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth)
    return (
      <MinimamLayout>
        <AuthOnly />
      </MinimamLayout>
    );

  return <>{children}</>;
}
