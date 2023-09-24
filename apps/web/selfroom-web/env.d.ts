/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FRONT_WEB_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
