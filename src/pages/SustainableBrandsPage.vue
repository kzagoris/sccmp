<template>
  <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="py-24 text-center">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
        {{ t("sustainableBrands.Sustainable Brands") }}
      </h1>
      <p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">
        {{ t("sustainableBrands.subTitle") }}
      </p>
    </div>
    <div
      class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8"
    >
      <div
        v-for="brand in sustainableBrands"
        :key="brand.title"
        class="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
      >
        <div class="bg-gray-200 group-hover:opacity-75 sm:h-96">
          <img
            :src="`${baseImageUrl}sustainable-brands/${brand.image}`"
            :alt="brand.title"
            class="aspect-[4/3] sm:aspect-auto size-full object-cover object-top sm:size-full"
          />
        </div>
        <div class="flex flex-1 flex-col space-y-2 p-4">
          <h3 class="text-sm font-medium text-gray-900">
            {{ brand.title }}
          </h3>
          <p class="text-sm text-gray-500 prose" v-html="brand.description"></p>
          <div class="mt-6 flex justify-center space-x-6">
            <a
              v-for="social in brand.socials"
              :key="social.url"
              target="_blank"
              :href="social.url"
              class="text-gray-400 duration-700 hover:text-gray-600"
            >
              <span class="sr-only">{{ social.type }}</span>
              <SocialIcon
                :social-type="social.type"
                class="size-6"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { SocialType } from "../helpers/site-settings"
import { ref } from "vue"
import { watchEffect } from "vue"
import SocialIcon from "../components/SocialIcon.vue"

const countries = [
  { code: "cy", name: "Cyprus", unicode: "🇨🇾" },
  { code: "es", name: "Spain", unicode: "🇪🇸" },
  { code: "it", name: "Italy", unicode: "🇮🇹" },
  { code: "fr", name: "France", unicode: "🇫🇷" },
  { code: "cz", name: "Czech", unicode: "🇨🇿" },
  { code: null, name: "All countries", unicode: "🌍" },
] as const

type SustainableBrandsType = {
  title: string
  description: string
  country: (typeof countries)[number]["code"]
  image: string
  socials: { url: string; type: SocialType | "website" }[]
}

const { locale, t } = useI18n({ useScope: "global" })
const { appId, baseImageUrl } = storeToRefs(useSiteConfigStore())

const sustainableBrands = ref<SustainableBrandsType[]>([])
watchEffect(async () => {
  try {
    sustainableBrands.value =
      ((
        await import(
          `../locales/sustainable-brands/${appId.value}/${locale.value}.json`
        )
      ).default as SustainableBrandsType[]) ?? []
  } catch (error) {
    console.error(error)
    sustainableBrands.value =
      ((await import(`../locales/sustainable-brands/${appId.value}/en.json`))
        .default as SustainableBrandsType[]) ?? []
  }
})
</script>

<style scoped></style>
