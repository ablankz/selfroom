// routes
import { paths } from '@/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = `http://${import.meta.env.VITE_API_HOST}`;
export const HOST_OPENAPI = `http://${import.meta.env.VITE_OPENAPI_HOST}`;
export const HOST_ASSET = `http://${import.meta.env.VITE_ASSET_HOST}`

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
