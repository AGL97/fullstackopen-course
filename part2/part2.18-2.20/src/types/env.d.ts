/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_WHEATER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}