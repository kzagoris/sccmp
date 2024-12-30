<template>
  <main class="flex-1">
    <div class="sm:flex sm:flex-col sm:justify-between">
      <div
        class="min-w-0 flex-1 divide-y divide-gray-200 border-b border-gray-200"
      >
        <h1 class="m-5 text-lg font-medium leading-6 text-gray-900 sm:truncate">
          {{ t("handbook.handbook") }}
        </h1>
      </div>
      <div
        class="mt-4 flex h-[80vh] items-center justify-center p-8 sm:ml-4 sm:mt-0 sm:px-6 lg:px-8"
      >
        <iframe
          v-if="handbook?.file"
          :src="handbook?.file"
          allowfullscreen
          class="size-full"
        ></iframe>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { ref, watchEffect } from "vue"

type HandbookType = {
  image: string
  file: string
}

const { t, locale } = useI18n({ useScope: "global" })

const { appId } = storeToRefs(useSiteConfigStore())

const handbook = ref<HandbookType | null>(null)

watchEffect(async () => {
  try {
    handbook.value =
      (await import(`../locales/handbook/${appId.value}/${locale.value}.json`))
        .default ?? []
  } catch (error) {
    handbook.value =
      (await import(`../locales/handbook/${appId.value}/en.json`)).default ?? []
  }
})
</script>

<style scoped></style>
