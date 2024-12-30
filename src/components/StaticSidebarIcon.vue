<template>
  <div
    class="fixed inset-y-0 hidden w-20 flex-col border-r border-gray-200 bg-gray-100 lg:flex"
  >
    <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div class="flex-1">
        <div class="flex items-center justify-center px-1 py-4">
          <img
            class="h-6 w-auto"
            :src="primaryLogoUrl"
            :alt="siteConfig.appTitle"
          />
        </div>
        <nav
          aria-label="Sidebar"
          class="flex flex-col items-center space-y-3 py-6"
        >
          <div v-for="item in translatedNavigationMenu" :key="item.name">
            <a
              v-if="item.isExternal"
              :href="item.to"
              target="_blank"
              class="group flex items-center rounded-md p-2 text-base font-medium leading-5 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <component :is="item.icon" class="size-6" aria-hidden="true" />
              <span class="sr-only">{{ item.name }}</span>
            </a>
            <router-link
              v-else
              :to="item.to"
              class="flex items-center rounded-lg p-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <component :is="item.icon" class="size-6" aria-hidden="true" />
              <span class="sr-only">{{ item.name }}</span>
            </router-link>
          </div>
        </nav>
      </div>
      <UserMenu
        class="flex shrink-0 justify-center pb-5"
        :is-icon-menu="true"
        :is-top-menu="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserMenu from "./UserMenu.vue"
import { navigationMenu } from "../helpers/navigation-menu"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"

const { primaryLogoUrl, siteConfig } = storeToRefs(useSiteConfigStore())
const { t } = useI18n()

const translatedNavigationMenu = navigationMenu.map((item) => {
  return {
    ...item,
    name: t(item.name),
  }
})
</script>

<style scoped></style>
