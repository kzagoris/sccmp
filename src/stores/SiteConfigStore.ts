import { siteSettings } from "./../helpers/site-settings"
import { defineStore } from "pinia"
import { ref } from "vue"
import { AppIdType } from "../vite-env"

export const useSiteConfigStore = defineStore("siteConfig", () => {
  const BASE_URL = "/assets"

  const siteConfig = ref({
    appId: import.meta.env.VITE_APP_ID as AppIdType,
    appTitle: import.meta.env.VITE_APP_TITLE as string,
    appDescription: import.meta.env.VITE_APP_DESCRIPTION as string,
    appPrimaryColor: import.meta.env.VITE_APP_PRIMARY_COLOR as string,
    appPrimaryLightColor: import.meta.env
      .VITE_APP_PRIMARY_LIGHT_COLOR as string,
    appSecondaryColor: import.meta.env.VITE_APP_SECONDARY_COLOR as string,
    appPrimaryLogo: import.meta.env.VITE_APP_PRIMARY_LOGO as string,
    appSecondaryLogo: import.meta.env.VITE_APP_SECONDARY_LOGO as string,
    appProjectNumber: import.meta.env.VITE_APP_PROJECT_NO as string,
    appProjectTitle: import.meta.env.VITE_APP_PROJECT_TITLE as string,
    appProjectWebUrl: import.meta.env.VITE_APP_PROJECT_WEB_URL as string,
    appProjectStartDate: import.meta.env.VITE_APP_PROJECT_START_DATE as string,
    appProjectEndDate: import.meta.env.VITE_APP_PROJECT_END_DATE as string,
  })

  const currentSiteSettings = ref(siteSettings.get(siteConfig.value.appId))

  const appId = ref(siteConfig.value.appId)

  const primaryLogoUrl = ref(
    `${BASE_URL}/${siteConfig.value.appId}/images/${siteConfig.value.appPrimaryLogo}`,
  )
  const secondaryLogoUrl = ref(
    `${BASE_URL}/${siteConfig.value.appId}/images/${siteConfig.value.appSecondaryLogo}`,
  )

  const baseImageUrl = ref(`${BASE_URL}/${siteConfig.value.appId}/images/`)
  const baseUrl = ref(`${BASE_URL}/${siteConfig.value.appId}/`)

  return {
    siteConfig,
    primaryLogoUrl,
    secondaryLogoUrl,
    appId,
    baseImageUrl,
    currentSiteSettings,
    baseUrl,
  }
})
