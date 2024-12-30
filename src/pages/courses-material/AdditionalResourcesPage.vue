<template>
  <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-5">
    <h1 class="mb-10 text-3xl font-extrabold text-slate-900">
      {{ t("additionalResources.additionalResources") }}
    </h1>
    <div class="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="(file, index) in coursesMaterialFiles" :key="index">
          <a :href="file.href" target="_blank" class="block hover:bg-gray-50">
            <div class="p-4 sm:px-6">
              <div class="mt-2 lg:flex lg:justify-between">
                <div class="sm:flex">
                  <div class="flex min-w-0 flex-1 items-center">
                    <div
                      class="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4"
                    >
                      <div>
                        <p class="text-sm font-medium text-indigo-600">
                          {{ file.title }}
                        </p>
                        <p class="mt-2 flex items-center text-sm text-gray-500">
                          {{ file.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                >
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm duration-700 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <ArrowDownOnSquareIcon
                      class="-ml-1 mr-2 size-5"
                      aria-hidden="true"
                    />
                    {{ t("additionalResources.files.download") }}
                  </button>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownOnSquareIcon } from "@heroicons/vue/20/solid"
import { storeToRefs } from "pinia"
import { ref, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { useSiteConfigStore } from "../../stores/SiteConfigStore"

type CoursesMaterialFileType = {
  title: string
  description: string
  href: string
}

const { t, locale } = useI18n({ useScope: "global" })
const { appId } = storeToRefs(useSiteConfigStore())

const coursesMaterialFiles = ref<CoursesMaterialFileType[]>([])

watchEffect(async () => {
  try {
    coursesMaterialFiles.value =
      (
        await import(
          `../../locales/courses-material/${appId.value}/files/${locale.value}.json`
        )
      ).default ?? []
  } catch (error) {
    coursesMaterialFiles.value =
      (
        await import(
          `../../locales/courses-material/${appId.value}/files/en.json`
        )
      ).default ?? []
  }
})
</script>

<style scoped></style>
