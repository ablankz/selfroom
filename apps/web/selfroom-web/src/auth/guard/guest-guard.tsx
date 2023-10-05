import { useCallback, useEffect, useState } from 'react';
// routes
import { useRouter, useSearchParams } from '@/routes/hooks';
//
import { useAuthContext } from '../hooks';
import { PATH_AFTER_LOGIN } from '@/config-global';
import MinimamLayout from '@/layouts/minimam-layout';
import GuestOnly from '@/sections/error/guest-only';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [auth, setAuth] = useState(false);

  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    // if (authenticated) {
    //   router.replace(returnTo);
    // }
    setAuth(authenticated);
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (auth)
    return (
      <MinimamLayout>
        <GuestOnly />
      </MinimamLayout>
    );

  return <>{children}</>;
}
