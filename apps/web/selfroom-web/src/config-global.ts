// routes
import { paths } from '@/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST = `${import.meta.env.VITE_HOST}`;
export const HOST_API = `${import.meta.env.VITE_API_HOST}`;
export const HOST_OPENAPI = `${import.meta.env.VITE_OPENAPI_HOST}`;
export const GITHUB_LINK = `${import.meta.env.VITE_GITHUB_LINK}`;
export const HOST_ASSET = `${import.meta.env.VITE_ASSET_HOST}`

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.chat; // as '/dashboard'
