<template>
  <nav
    aria-label="Sections"
    class="flex w-96 shrink-0 flex-col border-r border-slate-200 bg-white"
  >
    <div class="flex h-16 shrink-0 items-center border-b border-slate-200 px-6">
      <p class="text-lg font-medium text-slate-900">
        {{ t("additionalResources.additionalResources") }}
      </p>
    </div>
    <div class="min-h-0 flex-1 overflow-y-auto">
      <router-link
        v-for="item in activeSubNavigation"
        :key="item.name"
        :to="item.to"
        :class="[
          item.current ? 'bg-blue-50/50' : 'hover:bg-blue-50/50',
          'flex border-b border-slate-200 p-6',
        ]"
        :aria-current="item.current ? 'page' : undefined"
      >
        <component
          :is="item.icon"
          class="-mt-0.5 size-6 shrink-0 text-slate-400"
          aria-hidden="true"
        />
        <div class="ml-3 text-sm">
          <p class="font-medium text-slate-900">{{ item.name }}</p>
          <p class="mt-1 text-slate-500">{{ item?.description }}</p>
        </div>
      </router-link>
    </div>
  </nav>
</template>
<script setup lang="ts">
import {
  DocumentTextIcon,
  FilmIcon,
  FolderOpenIcon,
} from "@heroicons/vue/24/outline"
import { computed, ref } from "vue"
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"

const route = useRoute()
const { t } = useI18n()

type subNavigationType = {
  id: string
  name: string
  description?: string
  to: string
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>
  current: boolean
}

const subNavigation = ref<subNavigationType[]>([
  {
    id: "files",
    name: t("additionalResources.files.name"),
    description: t("additionalResources.files.description"),
    to: "/courses-material/files",
    icon: FolderOpenIcon,
    current: true,
  },
  {
    id: "videos",
    name: t("additionalResources.videos.name"),
    description: t("additionalResources.videos.description"),
    to: "/courses-material/videos",
    icon: FilmIcon,
    current: false,
  },
  {
    id: "articles",
    name: t("additionalResources.articles.name"),
    description: t("additionalResources.articles.description"),
    to: "/courses-material/articles",
    icon: DocumentTextIcon,
    current: false,
  },
])

const activeSubNavigation = computed(() => {
  return subNavigation.value.map((item) => {
    return {
      ...item,
      current: item.to === route.path,
    }
  })
})
</script>
<style scoped></style>
