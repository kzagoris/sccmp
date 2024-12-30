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
              'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary',
            ]"
          >
            <div class="mt-1 flex h-full flex-col">
              <img
                :alt="action.title"
                class="object-cover p-5"
                :src="baseImageUrl + 'modules/' + action.image"
                title="module training"
              />
              <h3 class="text-center text-xl font-medium">
                {{ action.title }}
              </h3>
              <p
                class="mt-2 text-justify text-gray-500"
                v-html="action.description"
              ></p>
              <div class="grow"></div>
              <div class="flex gap-3">
                <a
                  target="_blank"
                  :href="baseImageUrl + 'modules/' + action.file"
                  class="mt-5 inline-flex w-full gap-x-1.5 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-500 hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ArrowDownCircleIcon
                    class="-ml-0.5 size-5"
                    aria-hidden="true"
                  />
                  <span class="w-full text-center">{{
                    t("trainingModules.Download")
                  }}</span>
                </a>
                <a
                  target="_blank"
                  :href="baseImageUrl + 'modules/' + action.presentation"
                  class="mt-5 inline-flex w-full gap-x-1.5 rounded-md bg-secondary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-500 hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <EyeIcon class="-ml-0.5 size-5" aria-hidden="true" />
                  <span class="w-full text-center">{{
                    t("trainingModules.Presentation")
                  }}</span>
                </a>
                <a
                  target="_blank"
                  :href="baseImageUrl + 'modules/' + action.quiz"
                  class="mt-5 inline-flex w-full gap-x-1.5 rounded-md bg-drones-orange px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-500 hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <BuildingLibraryIcon
                    class="-ml-0.5 size-5"
                    aria-hidden="true"
                  />
                  <span class="w-full text-center">{{
                    t("trainingModules.Quizzes")
                  }}</span>
                </a>
              </div>
            </div>
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
import {
  ArrowDownCircleIcon,
  EyeIcon,
  BuildingLibraryIcon,
} from "@heroicons/vue/20/solid"

type TrainingModulesType = {
  title: string
  description: string
  image: string
  file: string
  presentation: string
  quiz: string
}

const { t, locale } = useI18n({ useScope: "global" })
const { appId, baseImageUrl } = storeToRefs(useSiteConfigStore())

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
