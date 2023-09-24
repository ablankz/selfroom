import CompactLayout from './layouts/compact/layout';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SplashScreen } from './components/loading-screen';
import NotFoundPage from './pages/404';

function NotFound() {
  return (
    <CompactLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
        <NotFoundPage />
      </Suspense>
    </CompactLayout>
  );
}
export default NotFound;
