import { Language } from "../models/Language"

export const getDefaultLanguage = (): Language => {
  //const navigatorLanguage = navigator.language.split("-")?.[0] ?? "en"
  const languageString: string | null = localStorage.getItem("language")

  const localLanguage: Language | undefined | null = languageString
    ? JSON.parse(languageString)
    : null
  return localLanguage ?? { code: "en", name: "English", unicode: "🇬🇧" }
}
