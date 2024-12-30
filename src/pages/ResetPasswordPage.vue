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
            @submit="resetPassword"
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
              <button
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm duration-700 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {{ t("login.Reset password") }}
              </button>
            </div>
          </Form>

          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <div class="ml-2 block text-sm text-gray-900">
                {{ t("login.Remember your password?") }}
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
    </div>
  </main>
</template>

<script setup lang="ts">
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { useUserStore } from "../stores/UserStore"
import { useAlertMessageStore } from "../stores/AlertMessageStore"
import { markRaw, ref } from "vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { string, object } from "yup"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"

const { primaryLogoUrl, siteConfig } = storeToRefs(useSiteConfigStore())
const { setAlertMessage } = useAlertMessageStore()
const { t } = useI18n({ useScope: "global" })
const { resetPassword: sendResetEmail } = useUserStore()
const email = ref<string>()

const formSchema = markRaw(
  object({
    email: string()
      .email(t("login.Needs a valid email address"))
      .required(t("login.Email is required")),
  }),
)

async function resetPassword() {
  if (!email.value) {
    return
  }
  try {
    await sendResetEmail(email.value)
    setAlertMessage(t("login.Password reset email sent"), "success")
  } catch (error) {
    setAlertMessage((error as Error).message, "error")
  }
}
</script>

<style scoped>
/* You can add your styles here */
</style>
