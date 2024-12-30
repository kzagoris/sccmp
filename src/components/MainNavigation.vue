<template>
  <nav>
    <div class="space-y-1">
      <div v-for="item in currentNavigationMenu" :key="item.to">
        <a
          v-if="item.isExternal"
          :href="item.to"
          target="_blank"
          class="group flex items-center rounded-md p-2 text-base font-medium leading-5 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        >
          <component
            :is="item.icon"
            class="mr-3 size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />

          {{ item.name }}
        </a>
        <router-link
          v-else
          :to="item.to"
          :class="[
            item.current
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center rounded-md p-2 text-base font-medium leading-5',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          <component
            :is="item.icon"
            :class="[
              item.current
                ? 'text-gray-500'
                : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 size-6 shrink-0',
            ]"
            aria-hidden="true"
          />
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { navigationMenu } from "../helpers/navigation-menu"

const { t } = useI18n()

const route = useRoute()
const currentNavigationMenu = computed(() =>
  navigationMenu.map((item) => ({
    ...item,
    current: item.to === route.path,
    name: t(item.name),
  })),
)
</script>

<style scoped></style>
