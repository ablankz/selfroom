import { Outlet, useRoutes } from 'react-router-dom';
import { dashboardRoutes } from './dashboard';
import NotFound from '@/NotFound';
import MainLayout from '@/layouts/main/layout';
import { Suspense, lazy } from 'react';
import CompactLayout from '@/layouts/compact/layout';
import { SplashScreen } from '@/components/loading-screen';

// ----------------------------------------------------------------------

const AuthCallbackPage = lazy(() => import('../../pages/oauth-callback'));
const Page500 = lazy(() => import('../../pages/500-cover'));

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    // {
    //   path: '/',
    //   element: (
    //     <MainLayout>
    //       <HomePage />
    //     </MainLayout>
    //   ),
    // },

    // // Dashboard routes
    ...dashboardRoutes,

    // // Main routes
    // ...mainRoutes,

    {
      path: '/oauth-callback',
      element: (
        <MainLayout>
          <AuthCallbackPage />
        </MainLayout>
      ),
    },

    {
      element: (
        <CompactLayout>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </CompactLayout>
      ),
      children: [{ path: '/internal-server-error', element: <Page500 /> }],
    },
    // // No match 404
    { path: '*', element: <NotFound /> },
  ]);
}
