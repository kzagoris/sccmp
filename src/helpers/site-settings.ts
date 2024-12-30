import { AppIdType } from "../vite-env"
import { type AlertMessageType } from "../stores/AlertMessageStore"
import { Language, LanguageHome } from "../models/Language"

export interface SiteSettings {
  siteDomain: string
  newsletterUrl: string
  socials: SocialLinkType[]
}

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

export type ColorThemeType = {
  textColor: string
  textColorIcon: string
  textColorButton: string
  textColorButtonHover: string
  focusRingColor: string
  focusRingOffsetColor: string
  backgroundColor: string
  borderColor: string
}

export type SocialType =
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "website"
  | "email"
  | "etsy"
  | "store"
  | "showroom"
export type SocialLinkType = {
  type: SocialType
  url: string
}

export const getSiteId = (): AppIdType => {
  return import.meta.env.VITE_APP_ID
}

export const getFirebaseConfig = (): FirebaseConfig => {
  return {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
  }
}

export const getLanguages = (appId: AppIdType): Language[] => {
  return languageSettings[appId] ?? []
}
export const colorAlertTheme: Record<AlertMessageType, ColorThemeType> = {
  success: {
    textColor: "text-green-800",
    textColorIcon: "text-green-400",
    textColorButton: "text-green-500",
    textColorButtonHover: "hover:bg-green-100",
    backgroundColor: "bg-green-50",
    borderColor: "border-green-400",
    focusRingOffsetColor: "focus:ring-offset-green-50",
    focusRingColor: "focus:ring-green-600",
  },
  error: {
    textColor: "text-red-800",
    textColorIcon: "text-red-400",
    textColorButton: "text-red-500",
    textColorButtonHover: "hover:bg-red-100",
    backgroundColor: "bg-red-50",
    borderColor: "border-red-400",
    focusRingOffsetColor: "focus:ring-offset-red-50",
    focusRingColor: "focus:ring-red-600",
  },
  warning: {
    textColor: "text-yellow-800",
    textColorIcon: "text-yellow-400",
    textColorButton: "text-yellow-500",
    textColorButtonHover: "hover:bg-yellow-100",
    backgroundColor: "bg-yellow-50",
    borderColor: "border-yellow-400",
    focusRingOffsetColor: "focus:ring-offset-yellow-50",
    focusRingColor: "focus:ring-yellow-600",
  },
  info: {
    textColor: "text-blue-800",
    textColorIcon: "text-blue-400",
    textColorButton: "text-blue-500",
    textColorButtonHover: "hover:bg-blue-100",
    backgroundColor: "bg-blue-50",
    borderColor: "border-blue-400",
    focusRingOffsetColor: "focus:ring-offset-blue-50",
    focusRingColor: "focus:ring-blue-600",
  },
}

export const siteSettings: Map<AppIdType, SiteSettings> = new Map()

siteSettings.set("debug", {
  siteDomain: "debug.zagorsolutions.cloud",
  newsletterUrl: "https://buttondown.email/api/emails/embed-subscribe/",
  socials: [{ type: "facebook", url: "https://www.facebook.com" }],
})

const languageSettings: Record<AppIdType, Language[]> = {
  debug: [
    { code: "en", name: "English", unicode: "🇬🇧" },
    { code: "el", name: "Ελληνικά", unicode: "🇬🇷" },
    { code: "fr", name: "Français", unicode: "🇫🇷" },
    { code: "it", name: "Italiano", unicode: "🇮🇹" },
  ],
}

export const languageHomeSettings: LanguageHome[] = [
  { code: "en", imageUrl: "flags/uk.png", country: "United Kingdom" },
  { code: "el", imageUrl: "flags/cy.jpg", country: "Cyprus" },
  { code: "si", imageUrl: "flags/si.png", country: "Slovenia" },
  { code: "fr", imageUrl: "flags/fr.png", country: "France" },
  { code: "pt", imageUrl: "flags/pt.jpg", country: "Portugal" },
  { code: "it", imageUrl: "flags/it.png", country: "Italy" },
]
