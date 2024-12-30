<template>
  <main class="flex-1">
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex items-center justify-between">
          <img
            class="h-12 w-auto"
            :src="primaryLogoUrl"
            :alt="siteConfig.appTitle"
          />
          <img
            class="h-12 w-auto"
            :src="secondaryLogoUrl"
            alt="European Logo"
          />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ t("login.signInAccount") }}
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Form
            :validation-schema="formSchema"
            class="space-y-6"
            @submit="loginUser()"
          >
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                {{ t("login.Email address") }}
              </label>
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
              >
                {{ t("login.Password") }}
              </label>
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
              <button
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm duration-700 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </Form>
          <Transition
            name="fade"
            mode="out-in"
            appear
            enter-active-class="transition ease-out duration-1000"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
          >
            <div
              v-if="showForgetPassword"
              class="mt-6 flex items-center justify-between transition-all duration-1000"
            >
              <div class="flex items-center">
                <div class="ml-2 block text-sm text-gray-900">
                  {{ t("login.Forgot your password?") }}
                </div>
              </div>
              <div class="text-sm">
                <router-link
                  to="/reset-password"
                  class="font-medium text-primary duration-700 hover:text-secondary"
                  >{{ t("login.Reset it") }}
                </router-link>
              </div>
            </div>
          </Transition>
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <div class="ml-2 block text-sm text-gray-900">
                {{ t("login.You do not have an account?") }}
              </div>
            </div>

            <div class="text-sm">
              <router-link
                to="/register"
                class="font-medium text-primary duration-700 hover:text-secondary"
                >{{ t("login.Sign Up!") }}
              </router-link>
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
import { AuthError } from "firebase/auth"
import { storeToRefs } from "pinia"
import { ErrorMessage, Field, Form } from "vee-validate"
import { markRaw, ref, watch, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter, type LocationQueryValue } from "vue-router"
import { useCurrentUser } from "vuefire"
import { object, string } from "yup"
import { useAlertMessageStore } from "../stores/AlertMessageStore"
import { useProfileStore } from "../stores/ProfileStore"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { useUserStore } from "../stores/UserStore"
import LangSelection from "../components/LangSelection.vue"
import { Language } from "../models/Language"

const user = useCurrentUser()
const { profile } = storeToRefs(useProfileStore())
const { login } = useUserStore()
const { setAlertMessage } = useAlertMessageStore()
const router = useRouter()
const route = useRoute()
const { primaryLogoUrl, secondaryLogoUrl, siteConfig } =
  storeToRefs(useSiteConfigStore())
const { t, locale, setLocaleMessage, getLocaleMessage } = useI18n({
  useScope: "global",
})
const showForgetPassword = ref<boolean>(true) // if user click on forget password, show the message. Disabled for now

let email = ref<string>()
let password = ref<string>()
let language = ref<Language | null>(null)
watch(language, changeLanguage)
changeLanguage()

const formSchema = markRaw(
  object({
    email: string()
      .email(t("login.Needs a valid email address"))
      .required(t("login.Email is required")),
    password: string()
      .required(t("login.Password is required"))
      .min(6, t("login.Password must be at least 6 characters")),
  }),
)

watchEffect(async () => {
  if (user.value && profile.value) {
    await router.push((route.query.redirect as LocationQueryValue) ?? "/")
  } else if (user.value && !profile.value) {
    await router.push("/settings/profile?from=login")
  }
})

async function changeLanguage() {
  if (language.value && locale.value && language.value.code !== locale.value) {
    if (Object.keys(getLocaleMessage(language.value.code)).length === 0) {
      const messageLocale = await import(
        `../locales/${language.value.code}.json`
      )
      setLocaleMessage(language.value.code, messageLocale.default)
    }
    locale.value = language.value.code
    // localStorage.setItem("language", JSON.stringify(language.value))
  }
}
async function loginUser() {
  if (!email.value || !password.value) {
    return
  }
  try {
    return await login({
      email: email.value,
      password: password.value,
    })
  } catch (error: unknown) {
    showForgetPassword.value = true
    const authError = (error as AuthError)?.code
    if (!authError) {
      setAlertMessage((error as Error).message, "error")
      return
    }
    const errorMessages = (
      await import(`../locales/firebase-error-messages/${locale.value}.json`)
    ).default as Record<string, string>
    setAlertMessage(
      errorMessages[authError] ?? (error as AuthError).message,
      "error",
    )
  }
}
</script>

<style scoped></style>
