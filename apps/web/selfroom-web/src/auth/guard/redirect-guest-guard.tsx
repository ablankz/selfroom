import { useCallback, useEffect } from 'react';
// routes
import { useRouter, useSearchParams } from '@/routes/hooks';
//
import { useAuthContext } from '../hooks';
import { PATH_AFTER_LOGIN } from '@/config-global';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}