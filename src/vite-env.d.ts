/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Gelecekte başka ortam değişkenleri eklerseniz, buraya tanımlayabilirsiniz.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}