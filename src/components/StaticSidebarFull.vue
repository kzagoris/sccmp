<template>
  <div
    class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4 lg:pt-5"
  >
    <div class="flex shrink-0 flex-col items-center justify-center px-6">
      <img
        class="h-10 w-auto"
        :src="primaryLogoUrl"
        :alt="siteConfig.appTitle"
      />
    </div>
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="mt-6 flex h-0 flex-1 flex-col items-center overflow-y-auto overflow-x-hidden"
    >
      <!-- User account dropdown -->
      <UserMenu class="relative inline-block px-3 text-left" />
      <!-- Navigation -->
      <MainNavigation class="mt-6 grow px-3" />
      <LangSelection
        v-model="language"
        :show-label="false"
        options-placement="top"
        class="mb-4 w-4/5 shrink-0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserMenu from "./UserMenu.vue"
import MainNavigation from "./MainNavigation.vue"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { storeToRefs } from "pinia"
import LangSelection from "./LangSelection.vue"
import { useProfileStore } from "../stores/ProfileStore"
import { computed } from "vue"
import { Language } from "../models/Language"

const { primaryLogoUrl, siteConfig } = storeToRefs(useSiteConfigStore())
const profileStore = useProfileStore()

const language = computed({
  get: () => profileStore.currentLanguage,
  set: (value: Language) => profileStore.setCurrentLanguage(value),
})
</script>

<style scoped></style>
