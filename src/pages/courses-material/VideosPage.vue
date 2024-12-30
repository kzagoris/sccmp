<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-5">
    <h1 class="mb-10 text-3xl font-extrabold text-slate-900">
      {{ t("additionalResources.videos.name") }}
    </h1>
    <div class="grid grid-cols-1 gap-x-6 gap-y-28">
      <div v-for="video in videos" :key="video.src" class="group">
        <div class="aspect-h-9 aspect-w-16 w-full overflow-hidden rounded-lg">
          <div
            v-if="video.type === 'other'"
            class="size-full object-cover object-center group-hover:opacity-75"
          >
            <a :href="video.src" target="_blank" :aria-label="video.title">
              <img
                :src="`${baseImageUrl}resources/${video.image}`"
                alt=""
                class="w-full hover:cursor-pointer"
              />
            </a>
          </div>
          <video v-if="video.type === 'firebase'" preload="none" controls>
            <source :src="video.src" type="video/mp4" />
          </video>

          <iframe
            v-if="video.type === 'vimeo' || video.type === 'custom'"
            class="size-full border-0 object-cover object-center group-hover:opacity-75"
            :src="video.src"
            width="640"
            height="360"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media;geolocation"
            allowfullscreen
          ></iframe>
          <iframe
            v-if="video.type === 'youtube'"
            width="640"
            height="360"
            class="border-0 size-full object-cover object-center group-hover:opacity-75"
            :src="`https://www.youtube.com/embed/${video.src}`"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <iframe
            v-if="video.type === 'dailymotion'"
            class="size-full border-0 object-cover object-center group-hover:opacity-75"
            type="text/html"
            :src="`https://www.dailymotion.com/embed/video/${video.src}?autoplay=1`"
            width="100%"
            height="100%"
            allowfullscreen
            title="Dailymotion Video Player"
            allow="autoplay"
          >
          </iframe>
        </div>
        <div
          class="mt-4 flex items-center justify-between text-base font-medium text-gray-900"
        >
          <h3>
            {{ video.title }}
          </h3>
        </div>
        <p class="mt-1 text-sm italic text-gray-500">
          {{ video.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { useSiteConfigStore } from "../../stores/SiteConfigStore"
type CourseMaterialVideo =
  | {
      title: string
      description: string
      src: string
      type: "youtube" | "vimeo" | "custom" | "dailymotion" | "firebase"
    }
  | {
      title: string
      description: string
      src: string
      image: string
      type: "other"
    }

const { locale, t } = useI18n({ useScope: "global" })
const { appId } = storeToRefs(useSiteConfigStore())
const { baseImageUrl } = storeToRefs(useSiteConfigStore())
const videos = ref<CourseMaterialVideo[]>([])

watchEffect(async () => {
  try {
    videos.value =
      ((
        await import(
          `../../locales/courses-material/${appId.value}/videos/${locale.value}.json`
        )
      ).default as CourseMaterialVideo[]) ?? []
  } catch (error) {
    console.error(error)
    videos.value =
      ((
        await import(
          `../../locales/courses-material/${appId.value}/videos/en.json`
        )
      ).default as CourseMaterialVideo[]) ?? []
  }
})
</script>

<style scoped></style>
