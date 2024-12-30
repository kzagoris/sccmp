<template>
  <div class="h-full">
    <alert-message></alert-message>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600/75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute right-0 top-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex size-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex shrink-0 items-center justify-center px-4">
                <img
                  class="h-9 w-auto"
                  :src="primaryLogoUrl"
                  :alt="siteConfig.appTitle"
                />
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto flex flex-col">
                <MainNavigation class="px-2 grow" />
                <LangSelection
                  v-model="language"
                  :show-label="false"
                  options-placement="top"
                  class="mb-4 mx-2 w-4/5 shrink-0"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 shrink-0" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <StaticSidebarIcon v-if="isLoggedIn && useIconMenu" />
    <StaticSidebarFull v-if="isLoggedIn && !useIconMenu" />

    <!-- Main column -->
    <div
      id="main-column"
      class="flex h-auto min-h-screen flex-col"
      :class="{
        'lg:pl-0': !isLoggedIn && !useIconMenu,
        'lg:pl-20': isLoggedIn && useIconMenu,
        'lg:pl-64': isLoggedIn && !useIconMenu,
      }"
    >
      <div
        v-if="isLoggedIn"
        class="sticky top-0 z-10 flex h-16 shrink-0 border-b border-gray-200 bg-white lg:hidden"
      >
        <button
          type="button"
          class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon class="size-6" aria-hidden="true" />
        </button>
        <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex flex-1"></div>
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <UserMenu is-top-menu class="relative ml-3" />
          </div>
        </div>
      </div>
      <div class="grow">
        <router-view style="min-height: 65vh"></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue"
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import UserMenu from "./components/UserMenu.vue"
import MainNavigation from "./components/MainNavigation.vue"
import StaticSidebarFull from "./components/StaticSidebarFull.vue"
import StaticSidebarIcon from "./components/StaticSidebarIcon.vue"
import { useRoute } from "vue-router"
import { useSiteConfigStore } from "./stores/SiteConfigStore"
import Footer from "./components/MainFooter.vue"
import AlertMessage from "./components/AlertMessage.vue"
import { useI18n } from "vue-i18n"
import { getDefaultLanguage } from "./helpers/LocaleFunction"
import { useProfileStore } from "./stores/ProfileStore"
import { useCurrentUser } from "vuefire"
import { siteSettings } from "./helpers/site-settings"
import { storeToRefs } from "pinia"
import LangSelection from "./components/LangSelection.vue"
import { Language } from "./models/Language"
import {
  connectEmulators,
  useFirebaseEmulator,
} from "./composables/FirebaseFunction"

const route = useRoute()
const useIconMenu = ref(false)
watch(
  () => route.path,
  (newValue) => {
    useIconMenu.value =
      newValue.includes("/conversations") ||
      newValue.includes("/courses-material")
  },
)

const user = useCurrentUser()
const isLoggedIn = computed(
  () => Boolean(user.value) && profileStore.isProfileExists,
)
const { locale, setLocaleMessage, getLocaleMessage } = useI18n()

const profileStore = useProfileStore()
const language = computed({
  get: () => profileStore.currentLanguage,
  set: (value: Language) => profileStore.setCurrentLanguage(value),
})

const sidebarOpen = ref(false)
const { primaryLogoUrl, siteConfig, appId } = storeToRefs(useSiteConfigStore())

onMounted(() => {
  if (useFirebaseEmulator) connectEmulators()
  const siteDomain = siteSettings.get(appId.value)?.siteDomain
  if (!siteDomain) {
    console.error(
      "No site domain found.To enable analytics, please add site domain in site settings.",
    )
    return
  }
  if (
    document.querySelector(
      'script[src="https://zagorsolutions.cloud:9000/js/script.js"]',
    )
  ) {
    console.info("Analytics script already loaded.")
    return
  }

  const script = document.createElement("script", {})
  script.setAttribute("data-domain", siteDomain)
  script.src = `https://zagorsolutions.cloud:9000/js/script.js`
  script.defer = true
  document.head.appendChild(script)
})

watchEffect(async () => {
  if (profileStore.profile?.language?.code) {
    const currentLocale =
      profileStore.profile?.language?.code ?? getDefaultLanguage().code
    if (locale.value !== currentLocale) {
      if (Object.keys(getLocaleMessage(currentLocale)).length === 0) {
        const messageLocale = await import(`./locales/${currentLocale}.json`)
        setLocaleMessage(currentLocale, messageLocale.default)
      }
      locale.value = currentLocale
    }
  }
})
</script>

<style scoped></style>
