import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import DashboardLayout from '@/layouts/dashboard';
// components
import { LoadingScreen } from '@/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('../../pages/dashboard/app'));
const RawApiPage = lazy(() => import('../../pages/dashboard/raw-api'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '',
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'career',  element: <IndexPage /> },
      { path: 'overview', element: <RawApiPage /> },
      { path: 'auth', element: <RawApiPage /> },
      { path: 'raw-api', element: <RawApiPage /> },
    ],
  },
];
