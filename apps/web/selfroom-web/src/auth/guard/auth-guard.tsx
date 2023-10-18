import { useEffect, useCallback, useState } from 'react';
// routes
import { useRouter } from '@/routes/hooks';
//
import { useAuthContext } from '../hooks';
import MinimamLayout from '@/layouts/minimam-layout';
import AuthOnly from '@/sections/error/auth-only';
import { paths } from '@/routes/paths';

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
  }, [check]);

  if (!auth) {
    const searchParams = new URLSearchParams({
      returnTo: window.location.pathname,
    }).toString();

    const loginPath = paths.dashboard.auth;

    const href = `${loginPath}?${searchParams}`;

    return (
      <MinimamLayout>
        <AuthOnly redirectUrl={href} />
      </MinimamLayout>
    );
  }

  return <>{children}</>;
}
