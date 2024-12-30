<template>
  <div
    class="mx-auto grid max-w-4xl grid-cols-1 gap-5 overflow-hidden bg-gray-50 p-5 md:grid-cols-2"
  >
    <div
      v-for="menu in translatedNavigationMenu"
      :key="menu.name"
      class="group relative max-h-[28em] bg-white p-6 shadow focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-lg"
    >
      <div class="mt-8 px-4 py-5 sm:p-6">
        <h3 class="flex gap-2 text-base font-semibold leading-6 text-gray-900">
          <component :is="menu.icon" class="size-6" />
          <a
            v-if="menu.isExternal"
            :href="menu.to"
            class="focus:outline-none"
            target="_blank"
          >
            <!-- Extend touch target to entire panel -->
            <span class="absolute inset-0" aria-hidden="true" />
            {{ menu.name }}
          </a>
          <router-link v-else :to="menu.to" class="focus:outline-none">
            <!-- Extend touch target to entire panel -->
            <span class="absolute inset-0" aria-hidden="true" />
            {{ menu.name }}
          </router-link>
        </h3>
        <img
          v-if="menu.image"
          :alt="menu.name"
          :src="baseImageUrl + menu.image"
          :title="menu.name"
          class="my-4 object-fill"
        />
      </div>
      <div
        class="pointer-events-none absolute bottom-6 right-6 flex gap-3 text-gray-500 duration-300 group-hover:text-gray-900"
        aria-hidden="true"
      >
        <span class="text-sm">{{ t("menu.Check it out") }}</span>
        <ArrowRightIcon class="size-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/outline"
import { navigationMenu } from "../helpers/navigation-menu"
import { useI18n } from "vue-i18n"
import { storeToRefs } from "pinia"
import { useSiteConfigStore } from "../stores/SiteConfigStore"

const { baseImageUrl } = storeToRefs(useSiteConfigStore())

const { t } = useI18n()

const translatedNavigationMenu = navigationMenu
  .filter((item) => item.name !== "menu.Home")
  .map((item) => {
    return {
      ...item,
      name: t(item.name),
      description: item.description && t(item.description),
    }
  })
</script>

<style scoped></style>
