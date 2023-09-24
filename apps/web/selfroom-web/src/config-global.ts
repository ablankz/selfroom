// routes
import { paths } from '@/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = `http://${import.meta.env.VITE_API_HOST}`;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
