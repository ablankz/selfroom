import { FallbackProps } from 'react-error-boundary';
import CompactLayout from './layouts/compact/layout';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SplashScreen } from './components/loading-screen';
import Page500 from './pages/500';

function ErrorFallback(props: FallbackProps) {
  return (
    <CompactLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
        <Page500 {...props}/>
      </Suspense>
    </CompactLayout>
  );
}
export default ErrorFallback;
