<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-5">
    <h1 class="text-3xl font-extrabold text-slate-900">
      {{ t("additionalResources.articles.name") }}
    </h1>
    <div class="mx-auto mt-12 grid gap-5">
      <div
        v-for="post in articles"
        :key="post.title"
        class="flex flex-col overflow-hidden rounded-lg shadow-lg"
      >
        <div class="shrink-0">
          <img
            v-if="post.imageUrl"
            class="h-48 w-full object-cover"
            :src="`${baseImageUrl}resources/${post.imageUrl}`"
            alt=""
          />
        </div>
        <div class="flex flex-1 flex-col justify-between bg-white p-6">
          <div class="flex-1">
            <a :href="post.href" class="mt-2 block" target="_blank">
              <p class="text-xl font-semibold text-gray-900">
                {{ post.title }}
              </p>
              <p class="mt-3 text-base text-gray-500">
                {{ post.description }}
              </p>
            </a>
          </div>
          <div class="mt-6 flex items-center justify-end">
            <div class="shrink-0">
              <a
                :href="post.href"
                :title="t('additionalResources.articles.readMore')"
                target="_blank"
              >
                <span class="sr-only">{{
                  t("additionalResources.articles.readMore")
                }}</span>
                <ArrowRightIcon
                  class="size-6 text-primary"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { ArrowRightIcon } from "@heroicons/vue/20/solid"
import { useSiteConfigStore } from "../../stores/SiteConfigStore"
import { storeToRefs } from "pinia"

type CourseMaterialArticle = {
  title: string
  description: string
  href: string
  imageUrl?: string
}

const { locale, t } = useI18n({ useScope: "global" })
const { appId } = storeToRefs(useSiteConfigStore())
const { baseImageUrl } = storeToRefs(useSiteConfigStore())
const articles = ref<CourseMaterialArticle[]>([])

watchEffect(async () => {
  try {
    articles.value =
      ((
        await import(
          `../../locales/courses-material/${appId.value}/articles/${locale.value}.json`
        )
      ).default as CourseMaterialArticle[]) ?? []
  } catch (error) {
    console.error(error)
    articles.value =
      ((
        await import(
          `../../locales/courses-material/${appId.value}/articles/en.json`
        )
      ).default as CourseMaterialArticle[]) ?? []
  }
})
</script>

<style scoped></style>
