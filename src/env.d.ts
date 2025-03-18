/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRAKT_CLIENT_ID: string
  readonly VITE_TRAKT_CLIENT_SECRET: string
  readonly VITE_TRAKT_REDIRECT_URI: string
  readonly VITE_TRAKT_API_BASE_URL: string
  readonly UPLOADTHING_TOKEN: string
  readonly UPLOADTHING_APPID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
