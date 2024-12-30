<template>
  <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-5">
    <h1 class="mb-10 text-3xl font-extrabold text-slate-900">
      {{ t("successStories.Success Stories") }}
    </h1>
    <div class="flex justify-end items-center">
      <div>
        <h3 class="text-base mr-5">
          {{ t("successStories.Filter by Country") }}:
        </h3>
      </div>
      <Listbox v-model="country" as="div" class="w-48">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm hover:cursor-pointer focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          >
            <span class="flex items-center">
              <span>{{ country.unicode }}</span>
              <span class="ml-3 block truncate">{{
                t(`successStories.${country.name}`)
              }}</span>
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="size-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="my-1 absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                v-for="c in countries"
                :key="c.code ?? undefined"
                v-slot="{ active, selected }"
                as="template"
                :value="c"
              >
                <li
                  :class="[
                    active
                      ? 'cursor-pointer bg-indigo-600 text-white'
                      : 'cursor-default text-gray-900',
                    'relative select-none py-2 pl-3 pr-9',
                  ]"
                >
                  <div class="flex items-center">
                    <span>{{ c.unicode }}</span>
                    <span
                      :class="[
                        selected ? 'font-semibold' : 'font-normal',
                        'ml-3 block truncate',
                      ]"
                    >
                      {{ t(`successStories.${c.name}`) }}</span
                    >
                  </div>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-indigo-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    ]"
                  >
                    <CheckIcon class="size-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
    <div class="grid grid-cols-1 gap-x-6 gap-y-14">
      <div
        v-for="story in filteredSuccessStories"
        :key="story.title"
        class="group"
      >
        <div
          class="mt-4 flex items-center justify-between font-medium text-gray-900"
        >
          <h3 class="text-2xl mb-6">
            {{ story.title }}
          </h3>
        </div>
        <div
          v-if="story.video"
          class="aspect-h-9 aspect-w-16 w-full overflow-hidden rounded-lg"
        >
          <video
            v-if="story.video.type === 'firebase'"
            :poster="`${baseImageUrl}success-stories/${story.image}`"
            preload="none"
            controls
          >
            <source :src="story.video.src" type="video/mp4" />
          </video>
          <iframe
            v-if="story.video.type === 'vimeo' || story.video.type === 'custom'"
            class="size-full border-0 object-cover object-center group-hover:opacity-75"
            :src="story.video.src"
            width="640"
            height="360"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media;geolocation"
            allowfullscreen
          ></iframe>
          <iframe
            v-if="story.video.type === 'youtube'"
            width="640"
            height="360"
            class="border-0 size-full object-cover object-center group-hover:opacity-75"
            :src="`https://www.youtube.com/embed/${story.video.src}`"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <iframe
            v-if="story.video.type === 'dailymotion'"
            class="size-full border-0 object-cover object-center group-hover:opacity-75"
            type="text/html"
            :src="`https://www.dailymotion.com/embed/video/${story.video.src}?autoplay=1`"
            width="100%"
            height="100%"
            allowfullscreen
            title="Dailymotion Video Player"
            allow="autoplay"
          >
          </iframe>
        </div>
        <!--eslint-disable-next-line-->
        <div
          class="mt-1 text-sm italic text-gray-500 description-text"
          v-html="story.description"
        ></div>
        <div class="mt-4 flex justify-center space-x-6">
          <a
            v-for="social in story.socials"
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
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { storeToRefs } from "pinia"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { SocialType } from "../helpers/site-settings"
import SocialIcon from "../components/SocialIcon.vue"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/24/outline"

const { locale, t } = useI18n({ useScope: "global" })
const { appId, baseImageUrl } = storeToRefs(useSiteConfigStore())

const country = ref<(typeof countries)[number]>({
  code: null,
  name: "All countries",
  unicode: "🌍",
})
const countries = [
  { code: "cy", name: "Cyprus", unicode: "🇨🇾" },
  { code: "es", name: "Spain", unicode: "🇪🇸" },
  { code: "it", name: "Italy", unicode: "🇮🇹" },
  { code: "fr", name: "France", unicode: "🇫🇷" },
  { code: "cz", name: "Czech", unicode: "🇨🇿" },
  { code: null, name: "All countries", unicode: "🌍" },
] as const

type SuccessStoriesType = {
  title: string
  description?: string
  country: (typeof countries)[number]["code"]
  video?: {
    src: string
    type: "youtube" | "vimeo" | "custom" | "dailymotion" | "firebase"
  }
  image?: string
  socials: { url: string; type: SocialType | "website" }[]
}

const successStories = ref<SuccessStoriesType[]>([])

const filteredSuccessStories = computed(() => {
  if (country.value.code) {
    return successStories.value.filter(
      (story) => story.country === country.value.code,
    )
  }
  return successStories.value
})

watchEffect(async () => {
  try {
    successStories.value =
      ((
        await import(
          `../locales/success-stories/${appId.value}/${locale.value}.json`
        )
      ).default as SuccessStoriesType[]) ?? []
  } catch (error) {
    console.error(error)
    successStories.value =
      ((await import(`../locales/success-stories/${appId.value}/en.json`))
        .default as SuccessStoriesType[]) ?? []
  }
})
</script>

<style scoped>
.description-text > :deep(p) {
  margin-top: 1em !important;
}
</style>
