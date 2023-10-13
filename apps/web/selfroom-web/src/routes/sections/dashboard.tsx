import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import DashboardLayout from '@/layouts/dashboard';
// components
import { LoadingScreen } from '@/components/loading-screen';
import { AuthGuard, GuestGuard } from '@/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('../../pages/dashboard/introduction'));
const CareerPage = lazy(() => import('../../pages/dashboard/career'));
const SkillPage = lazy(() => import('../../pages/dashboard/skill'));
const WorksPage = lazy(() => import('../../pages/dashboard/works'));
const LinkPage = lazy(() => import('../../pages/dashboard/link'));

const OverviewPage = lazy(() => import('../../pages/dashboard/app'));
const AuthLoginPage = lazy(() => import('../../pages/dashboard/auth-login'));
const RawApiPage = lazy(() => import('../../pages/dashboard/raw-api'));
const ChatPage = lazy(() => import('../../pages/dashboard/chat'));

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
      { path: 'career', element: <CareerPage /> },
      { path: 'skill', element: <SkillPage /> },
      { path: 'works', element: <WorksPage /> },
      { path: 'link', element: <LinkPage /> },
      { path: 'overview', element: <OverviewPage /> },
      { path: 'raw-api', element: <RawApiPage /> },
      { path: 'profile/:id', element: <AuthLoginPage /> },
      {
        path: '',
        element: (
          <GuestGuard>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </GuestGuard>
        ),
        children: [
          { path: 'auth', element: <AuthLoginPage /> },
          { path: 'register', element: <AuthLoginPage /> },
        ],
      },
      {
        path: '',
        element: (
          <AuthGuard>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </AuthGuard>
        ),
        children: [
          { path: 'chat', element: <ChatPage /> },
          { path: 'setting', element: <ChatPage /> }
        ],
      },
    ],
  },
];
