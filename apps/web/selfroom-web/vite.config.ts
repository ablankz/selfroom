import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import removeConsole from 'vite-plugin-remove-console';
import strip from '@rollup/plugin-strip';
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    // dockerのネットワークのhostに対応するため
    server: {
      host: true,
      watch: {
        usePolling: true,
      },
      port: Number(process.env.VITE_FRONT_WEB_PORT || 5173),
      hmr: {
        path: "_vite/ws-hmr",
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger']: [],
    },
    plugins: [
      react(),
      removeConsole(),
      strip({
        // remove all console.log calls
        include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        functions: ['console.log', 'console.error', 'console.warn'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  });
};
