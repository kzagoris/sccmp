<template>
  <div class="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-12 xl:w-3/4">
    <div
      v-if="false && !userStore.auth.currentUser?.emailVerified"
      class="mb-6 border-l-4 border-yellow-400 bg-yellow-50 p-4"
    >
      <div class="flex">
        <div class="shrink-0">
          <ExclamationTriangleIcon
            class="size-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            {{ t("profile.noVerifyEmailMessage") }}.
          </p>
        </div>
      </div>
    </div>
    <h1 class="text-3xl font-extrabold text-slate-900">
      {{ t("profile.account") }}
    </h1>

    <Form
      class="mt-6 space-y-8 divide-y divide-slate-200"
      :validation-schema="formSchema"
      @submit="onSubmit"
    >
      <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
        <div class="sm:col-span-6">
          <h2 class="text-xl font-medium text-slate-900">
            {{ t("profile.profile") }}
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            {{ t("profile.shareInfoWarning") }}.
          </p>
        </div>

        <div class="sm:col-span-3">
          <label
            for="firstName"
            class="block text-sm font-medium text-slate-900"
          >
            {{ t("profile.firstName") }}
          </label>
          <Field
            id="firstName"
            v-model="localProfile.firstName"
            type="text"
            name="firstName"
            autocomplete="given-name"
            class="mt-1 block w-full rounded-md border-slate-300 text-slate-900 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm"
          />
          <ErrorMessage
            name="firstName"
            class="text-sm text-red-500"
          ></ErrorMessage>
        </div>

        <div class="sm:col-span-3">
          <label
            for="lastName"
            class="block text-sm font-medium text-slate-900"
          >
            {{ t("profile.lastName") }}
          </label>
          <Field
            id="lastName"
            v-model="localProfile.lastName"
            type="text"
            name="lastName"
            autocomplete="family-name"
            class="mt-1 block w-full rounded-md border-slate-300 text-slate-900 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm"
          />
          <ErrorMessage
            name="lastName"
            class="text-sm text-red-500"
          ></ErrorMessage>
        </div>

        <div class="sm:col-span-6">
          <label for="photo" class="block text-sm font-medium text-slate-900">
            {{ t("profile.photo") }}
          </label>
          <div class="mt-1 flex items-center">
            <AvatarImage :profile="localProfile"></AvatarImage>
            <div class="ml-4 flex">
              <div
                v-if="false"
                class="relative flex cursor-pointer items-center rounded-md border border-slate-300 bg-white px-3 py-2 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-light focus-within:ring-offset-2 focus-within:ring-offset-slate-50 hover:bg-slate-50"
              >
                <label
                  for="user-photo"
                  class="pointer-events-none relative text-sm font-medium text-slate-900"
                >
                  <span>{{
                    localProfile.photo ? t("profile.change") : t("profile.add")
                  }}</span>
                  <span class="sr-only"> {{ t("profile.userPhoto") }}</span>
                </label>
                <input
                  id="user-photo"
                  name="user-photo"
                  type="file"
                  class="absolute inset-0 size-full cursor-pointer rounded-md border-gray-300 opacity-0"
                />
              </div>
              <button
                v-if="localProfile.photo"
                type="button"
                class="ml-3 rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium text-slate-900 hover:text-slate-700 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-slate-50"
                @click="onRemovePhoto"
              >
                {{ t("profile.remove") }}
              </button>
            </div>
          </div>
        </div>
        <div class="sm:col-span-6">
          <label
            for="description"
            class="block text-sm font-medium text-slate-900"
          >
            {{ t("profile.description") }}</label
          >
          <div class="mt-1">
            <textarea
              id="description"
              v-model="localProfile.description"
              name="description"
              rows="4"
              class="block w-full rounded-md border border-slate-300 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm"
            />
          </div>
          <p class="mt-3 text-sm text-slate-500">
            {{ t("profile.profileDescription") }}.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
        <div class="sm:col-span-6">
          <h2 class="text-xl font-medium text-slate-900">
            {{ t("profile.personalInfo") }}
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            {{ t("profile.shareInfoWarning") }}.
          </p>
        </div>

        <div class="sm:col-span-2 flex flex-col justify-between">
          <label for="email" class="block text-sm font-medium text-slate-900">
            {{ t("profile.emailAddress") }}
          </label>
          <Field
            id="email"
            :value="localProfile.email"
            disabled
            readonly
            type="text"
            name="email"
            autocomplete="email"
            class="mt-1 block w-full rounded-md border-slate-300 text-slate-900 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm"
          />
          <ErrorMessage
            name="email"
            class="text-sm text-red-500"
          ></ErrorMessage>
        </div>

        <div class="sm:col-span-2 flex flex-col justify-between">
          <label for="age" class="block text-sm font-medium text-slate-900"
            >{{ t("profile.age") }}
          </label>
          <Field
            id="age"
            v-model="localProfile.age"
            type="number"
            name="age"
            autocomplete="tel"
            class="mt-1 block w-full rounded-md border-slate-300 text-slate-900 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm"
          />
          <ErrorMessage name="age" class="text-sm text-red-500"></ErrorMessage>
        </div>

        <div class="sm:col-span-2 flex flex-col justify-end">
          <LangSelection v-model="localProfile.language" />
        </div>
        <p
          v-if="localProfile.lastUpdated"
          class="text-sm text-slate-500 sm:col-span-6"
        >
          {{ t("profile.lastUpdated") }}
          <time :datetime="localProfile.lastUpdated.toDate().toString()">
            {{
              localProfile.lastUpdated
                ?.toDate()
                .toLocaleString(localProfile.language?.code, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })
            }}
          </time>
          .
        </p>
      </div>

      <div class="flex justify-end pt-8">
        <button
          type="submit"
          class="ml-3 inline-flex w-1/4 justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
        >
          {{
            localProfile.lastUpdated ? t("profile.update") : t("profile.create")
          }}
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline"
import { ErrorMessage, Field, Form } from "vee-validate"
import { markRaw, ref, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import { number, object, string } from "yup"
import AvatarImage from "../../components/AvatarImage.vue"
import { getDefaultLanguage } from "../../helpers/LocaleFunction"
import { InitialProfile, Profile } from "../../models/Profile"
import { useProfileStore } from "../../stores/ProfileStore"
import { useUserStore } from "../../stores/UserStore"
import LangSelection from "../../components/LangSelection.vue"

const { t } = useI18n({ useScope: "global" })
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const profileStore = useProfileStore()

const localProfile = ref<Profile | InitialProfile>({
  firstName: "",
  lastName: "",
  email: userStore.auth.currentUser?.email ?? "",
  age: 0,
  country: null,
  description: "",
  language: getDefaultLanguage(),
  photo: null,
  lastUpdated: null,
} as const)

watchEffect(() => {
  if (profileStore.profile) {
    if (
      route.query.from &&
      (route.query.from === "login" || route.query.from === "register")
    )
      router.push("/")
    localProfile.value = profileStore.profile
  }
})

const formSchema = markRaw(
  object().shape({
    firstName: string().required("First name is required"),
    lastName: string().required("Last name is required"),
    email: string().required("Email is required").email("Email is not valid"),
    age: number()
      .required("Age is required")
      .min(18, "Age must be greater than 18")
      .max(150),
  }),
)

async function onSubmit() {
  await profileStore.saveProfile(localProfile.value)
  await router.push("/")
}

function onRemovePhoto() {
  localProfile.value.photo = null
}
</script>

<style scoped></style>
