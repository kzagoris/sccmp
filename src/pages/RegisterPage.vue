<template>
  <main class="flex-1">
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-12 w-auto"
          :src="primaryLogoUrl"
          :alt="siteConfig.appTitle"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ t("login.Create an account") }}
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Form
            :validation-schema="formSchema"
            class="space-y-6"
            @submit="createUser"
          >
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
                >{{ t("login.Email address") }}</label
              >
              <div class="mt-1">
                <Field
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm duration-500 placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  class="text-sm text-red-500"
                ></ErrorMessage>
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >{{ t("login.Password") }}</label
              >
              <div class="mt-1">
                <Field
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm duration-500 placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  class="text-sm text-red-500"
                ></ErrorMessage>
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >{{ t("login.Verify Password") }}
              </label>
              <div class="mt-1">
                <Field
                  id="passwordVerification"
                  v-model="passwordVerification"
                  name="passwordVerification"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm duration-500 placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                />
                <ErrorMessage
                  name="passwordVerification"
                  class="text-sm text-red-500"
                ></ErrorMessage>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm duration-700 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {{ t("login.Create account") }}
              </button>
            </div>
          </Form>

          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <div class="ml-2 block text-sm text-gray-900">
                {{ t("login.Already have an account?") }}
              </div>
            </div>

            <div class="text-sm">
              <router-link
                to="/login"
                class="font-medium text-primary duration-700 hover:text-secondary"
                >{{ t("login.Sign In!") }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <LangSelection v-model="language" :show-label="false" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { useUserStore } from "../stores/UserStore"
import { useAlertMessageStore } from "../stores/AlertMessageStore"
import { type AuthError } from "firebase/auth"
import { markRaw, ref, watchEffect } from "vue"
import { LocationQueryValue, useRoute, useRouter } from "vue-router"
import { Field, Form, ErrorMessage } from "vee-validate"
import { object, ref as yupRef, string } from "yup"
import { useCurrentUser } from "vuefire"
import { useProfileStore } from "../stores/ProfileStore"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"
import LangSelection from "../components/LangSelection.vue"
import { Language } from "../models/Language"

const { primaryLogoUrl, siteConfig } = storeToRefs(useSiteConfigStore())
const { setAlertMessage } = useAlertMessageStore()
const { register } = useUserStore()
const { t, locale, setLocaleMessage, getLocaleMessage } = useI18n({
  useScope: "global",
})
const user = useCurrentUser()
const router = useRouter()
const route = useRoute()
const email = ref<string>()
const password = ref<string>()
const passwordVerification = ref<string>()
let language = ref<Language | null>(null)

const formSchema = markRaw(
  object({
    email: string()
      .email(t("login.Needs a valid email address"))
      .required(t("login.Email is required")),
    password: string()
      .required(t("login.Password is required"))
      .min(6, t("login.Password must be at least 6 characters")),
    passwordVerification: string()
      .required(t("login.Password verification is required"))
      .oneOf([yupRef("password")], t("login.Passwords do must match")),
  }),
)

watchEffect(async () => {
  if (user.value) {
    const { isProfileExistsAsync } = useProfileStore()
    if (await isProfileExistsAsync()) {
      await router.push((route.query.redirect as LocationQueryValue) ?? "/")
    } else {
      await router.push("/settings/profile")
    }
  }
})

watchEffect(async () => {
  if (language.value && language.value.code !== locale.value) {
    if (Object.keys(getLocaleMessage(language.value.code)).length === 0) {
      const messageLocale = await import(
        `../locales/${language.value.code}.json`
      )
      setLocaleMessage(language.value.code, messageLocale.default)
    }
    locale.value = language.value.code
    localStorage.setItem("language", JSON.stringify(language.value))
  }
})

async function createUser() {
  if (!email.value || !password.value) {
    return
  }

  try {
    const userCreated = await register({
      email: email.value,
      password: password.value,
    })
    console.info("User created", userCreated.user.email)
  } catch (error) {
    const authError = error as AuthError
    switch (authError.code) {
      case "auth/email-already-in-use":
        setAlertMessage("Email already in use", "error")
        break
      case "auth/invalid-email":
        setAlertMessage("Invalid email", "error")
        break
      case "auth/operation-not-allowed":
        setAlertMessage("Operation not allowed", "error")
        break
      case "auth/weak-password":
        setAlertMessage("Weak password", "error")
        break
      default:
        setAlertMessage(authError.message, "error")
    }
  }
}
</script>

<style scoped></style>
