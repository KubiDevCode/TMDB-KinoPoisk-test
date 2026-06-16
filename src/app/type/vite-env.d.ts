/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_ACCESS_TOKEN?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
