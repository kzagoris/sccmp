import { defineStore } from "pinia"
import { computed, watch } from "vue"
import { InitialProfile, Profile } from "../models/Profile"
import { setDoc, doc, Timestamp, getDoc } from "firebase/firestore"
import { useDocument, useFirestore, useCurrentUser } from "vuefire"
import { getDefaultLanguage } from "../helpers/LocaleFunction"
import { Language } from "../models/Language"

export const useProfileStore = defineStore("profile", () => {
  const db = useFirestore()
  const user = useCurrentUser()
  let isProfileExistsCacheValue = false

  const profileRef = computed(() => {
    if (!user.value) return null
    return doc(db, "profiles", user.value?.uid)
  })

  watch(user, () => {
    isProfileExistsCacheValue = false
  })

  const saveProfile = async (profile: InitialProfile) => {
    if (!profileRef.value) return
    profile.lastUpdated = Timestamp.fromDate(new Date())
    await setDoc(profileRef.value, profile, { merge: true })
  }

  const profile = useDocument<Profile>(profileRef)

  const currentLanguage = computed(() => {
    return profile.value?.language ?? getDefaultLanguage()
  })

  const setCurrentLanguage = async (language: Language) => {
    if (!profileRef.value) return
    await setDoc(profileRef.value, { language }, { merge: true })
    localStorage.setItem("language", JSON.stringify(language))
  }

  const isProfileExistsAsync = async () => {
    if (!profileRef.value) return false
    if (isProfileExistsCacheValue) return isProfileExistsCacheValue
    const docSnap = await getDoc(profileRef.value)
    isProfileExistsCacheValue = docSnap.exists()
    return isProfileExistsCacheValue
  }

  const isProfileExists = computed(() => {
    return !!profile.value
  })

  const userName = computed(() => {
    return profile.value?.email.split("@")[0] ?? ""
  })

  const fullName = computed(() => {
    return profile.value
      ? `${profile.value?.firstName} ${profile.value?.lastName}`
      : ""
  })

  return {
    profile,
    saveProfile,
    userName,
    fullName,
    isProfileExistsAsync,
    isProfileExists,
    currentLanguage,
    setCurrentLanguage,
  }
})
