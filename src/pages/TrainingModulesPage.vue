<template>
  <main class="flex-1">
    <div class="sm:flex sm:flex-col sm:justify-between">
      <div
        class="min-w-0 flex-1 divide-y divide-gray-200 border-b border-gray-200"
      >
        <h1 class="m-5 text-lg font-medium leading-6 text-gray-900 sm:truncate">
          {{ t("trainingModules.trainingModules") }}
        </h1>
      </div>
      <div class="mt-4 flex p-8 sm:ml-4 sm:mt-0 sm:px-6 lg:px-8">
        <div
          class="overflow-hidden rounded-lg bg-gray-200 shadow lg:grid lg:grid-cols-2 lg:gap-px"
        >
          <div
            v-for="(action, actionIdx) in actions"
            :key="action.title"
            :class="[
              actionIdx === 0 ? 'rounded-t-lg lg:rounded-tr-none' : '',
              actionIdx === 1 ? 'lg:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'lg:rounded-bl-lg' : '',
              actionIdx === actions.length - 1
                ? 'rounded-b-lg lg:rounded-bl-none'
                : '',
              'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
            ]"
          >
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <a
                  :href="baseImageUrl + 'modules/' + action.to"
                  target="_blank"
                  class="focus:outline-none"
                >
                  <span class="absolute inset-0" aria-hidden="true" />
                  {{ action.title }}
                </a>
              </h3>
              <img
                class="object-cover p-5"
                :src="baseImageUrl + 'modules/' + action.image"
                title="module training"
              />
              <p
                class="mt-2 text-justify text-gray-500"
                v-html="action.description"
              ></p>
            </div>
            <span
              class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                class="size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { useSiteConfigStore } from "../stores/SiteConfigStore"

type TrainingModulesType = {
  title: string
  description: string
  image: string
  to: string
}

const { t, locale } = useI18n({ useScope: "global" })
const { appId } = storeToRefs(useSiteConfigStore())

const { baseImageUrl } = storeToRefs(useSiteConfigStore())
const actions = ref<TrainingModulesType[]>([])

watchEffect(async () => {
  try {
    actions.value =
      (
        await import(
          `../locales/training-modules/${appId.value}/${locale.value}.json`
        )
      ).default ?? []
  } catch (error) {
    actions.value =
      (await import(`../locales/training-modules/${appId.value}/en.json`))
        .default ?? []
  }
})
</script>

<style scoped></style>
