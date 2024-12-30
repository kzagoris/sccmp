<template>
  <main class="flex flex-col size-full">
    <h1 class="my-14 text-2xl text-center">
      {{ t("home.Incubator: Choose your language") }}
    </h1>
    <div
      class="mx-auto w-full max-w-5xl grid grid-cols-1 gap-5 grow overflow-hidden bg-gray-50 p-5 md:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="lang in availableLanguages"
        :key="lang.code"
        class="group relative bg-white p-6 shadow focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-lg"
      >
        <div
          class="flex h-full items-center text-center hover:cursor-pointer"
          @click.stop="setLanguage(lang)"
        >
          <h3
            class="text-base font-semibold leading-6 text-gray-900 w-full text-center"
          >
            <span class="focus:outline-none">
              <!-- Extend touch target to entire panel -->
              <span class="absolute inset-0" aria-hidden="true" />
              {{ lang.name }}
            </span>
          </h3>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { computed } from "vue"
import { getLanguages } from "../helpers/site-settings"
import { useProfileStore } from "../stores/ProfileStore"
import { Language } from "../models/Language"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

const profileStore = useProfileStore()
const { t } = useI18n()
const { push } = useRouter()
const { appId } = storeToRefs(useSiteConfigStore())
const availableLanguages = computed(() => getLanguages(appId.value))

const setLanguage = async (lang: Language) => {
  await profileStore.setCurrentLanguage(lang)
  await push("/home")
}
</script>

<style scoped></style>
