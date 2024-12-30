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
          {{ t("login.Reset your password") }}
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Form
            :validation-schema="formSchema"
            class="space-y-6"
            @submit="setNewPassword"
          >
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
                {{ t("login.Set your password") }}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { useUserStore } from "../stores/UserStore"
import { useAlertMessageStore } from "../stores/AlertMessageStore"
import { type AuthError } from "firebase/auth"
import { markRaw, ref } from "vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { object, ref as yupRef, string } from "yup"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"

const { primaryLogoUrl, siteConfig } = storeToRefs(useSiteConfigStore())
const { setAlertMessage } = useAlertMessageStore()
const { newResetPassword } = useUserStore()
const { t } = useI18n({ useScope: "global" })
const password = ref<string>()
const passwordVerification = ref<string>()
const props = defineProps<{ token: string }>()
const formSchema = markRaw(
  object({
    password: string()
      .required(t("login.Password is required"))
      .min(6, t("login.Password must be at least 6 characters")),
    passwordVerification: string()
      .required(t("Password verification is required"))
      .oneOf([yupRef("password")], t("login.Passwords do must match")),
  }),
)

async function setNewPassword() {
  if (!password.value || !passwordVerification.value) return

  try {
    await newResetPassword({
      oobCode: props.token,
      newPassword: password.value,
    })
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
