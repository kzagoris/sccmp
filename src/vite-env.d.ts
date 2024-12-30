/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<unknown, unknown, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_ID: AppIdType
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_PRIMARY_COLOR: string
  readonly VITE_APP_PRIMARY_LIGHT_COLOR: string
  readonly VITE_APP_SECONDARY_COLOR: string
  readonly VITE_APP_PRIMARY_LOGO: string
  readonly VITE_APP_PROJECT_NO: string
  readonly VITE_APP_PROJECT_TITLE: string
  readonly VITE_APP_PROJECT_WEB_URL: string
  readonly VITE_APP_PROJECT_START_DATE: string
  readonly VITE_APP_PROJECT_END_DATE: string
  readonly VITE_APP_SECONDARY_LOGO: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export type AppIdType = "debug"
