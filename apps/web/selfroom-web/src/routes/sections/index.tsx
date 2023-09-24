import { useRoutes } from 'react-router-dom';
import { dashboardRoutes } from './dashboard';
import NotFound from '@/NotFound';

// ----------------------------------------------------------------------

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

    // // Auth routes
    // ...authRoutes,

    // // Dashboard routes
    ...dashboardRoutes,

    // // Main routes
    // ...mainRoutes,

    // // No match 404
    { path: '*', element: <NotFound /> },
  ]);
}
