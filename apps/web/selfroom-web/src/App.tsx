// i18n
import '@/locales/i18n';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

import 'react-json-view-lite/dist/index.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import './global.css';

// ----------------------------------------------------------------------

// routes
import Router from '@/routes/sections';
// theme
import ThemeProvider from '@/theme';
// locales
import { LocalizationProvider } from '@/locales';
// hooks
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
// components
import ProgressBar from '@/components/progress-bar';
import { MotionLazy } from '@/components/animate/motion-lazy';
import SnackbarProvider from '@/components/snackbar/snackbar-provider';
import { SettingsProvider, SettingsDrawer } from '@/components/settings';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
// auth
import { AuthProvider, AuthConsumer } from '@/auth/context';
import { ErrorHandleProvider } from './providers/ErrorHandleProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';
import { HOST_API } from './config-global';
// ----------------------------------------------------------------------

declare interface Window {
  Echo: Echo;
}

declare var window: Window;

const options = {
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_KEY || '',
  encrypted: true,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || '',
  authorizer: (channel: any, _: any) => {
    return {
      authorize: (socketId: any, callback: any) => {
        axios
          .post(
            `${HOST_API}/broadcasting/auth`,
            {
              socket_id: socketId,
              channel_name: channel.name,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
};

window.Echo = new Echo({
  ...options,
  client: new Pusher(options.key, options),
});

export default function App() {
  useScrollToTop();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  return (
    <LocalizationProvider>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <SnackbarProvider>
              <MotionLazy>
                <AuthProvider>
                  <ErrorHandleProvider>
                    <SettingsDrawer />
                    <ProgressBar />
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <AuthConsumer>
                        <Router />
                      </AuthConsumer>
                    </ErrorBoundary>
                  </ErrorHandleProvider>
                </AuthProvider>
              </MotionLazy>
            </SnackbarProvider>
          </ThemeProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
