<template>
  <footer
    :class="{
      'border-t': showFooterDescription,
    }"
    class="mx-2 mt-5 bg-gray-50 pt-5"
    aria-labelledby="footer-heading"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div>
      <div v-if="showFooterDescription" class="xl:grid xl:grid-cols-5 xl:gap-8">
        <div class="ml-5 flex flex-col space-y-8 xl:col-span-2">
          <div class="flex items-center justify-evenly">
            <img
              class="h-10"
              :src="primaryLogoUrl"
              :alt="siteConfig.appTitle"
            />
            <img class="h-10" :src="secondaryLogoUrl" alt="European Logo" />
          </div>
          <div class="text-center text-xs text-gray-500">
            <p class="mb-2">Project No. {{ siteConfig.appProjectNumber }}</p>
            <p class="mb-2">
              {{ siteConfig.appProjectTitle }}
            </p>
            <p class="mb-2">
              Start Date: {{ siteConfig.appProjectStartDate }}, End Date:
              {{ siteConfig.appProjectEndDate }}
            </p>
            <p class="mb-2">
              {{
                t(
                  "footer.This project has been funded with support from the European Commission",
                )
              }}
            </p>
            <p class="mb-2">
              {{
                t(
                  "footer.This website reflects the views only of the author, and the Commission cannot be held responsible for any  use which may be made of the information contained herein",
                )
              }}
            </p>
          </div>
        </div>
        <div class="mt-12 flex flex-col items-center xl:col-span-3 xl:mt-0">
          <h3 class="text-base font-medium text-gray-900">
            {{ t("footer.Keep up to date with the latest news from") }}
            {{ siteConfig.appTitle }}.
          </h3>
          <p class="mt-4 text-base text-gray-500">
            {{ t("footer.Sign up to our Newsletter") }}.
          </p>
          <form
            class="my-4 sm:flex sm:max-w-md"
            :action="currentSiteSettings?.newsletterUrl"
            method="post"
            target="popupwindow"
          >
            <label for="button-down-email" class="sr-only">{{
              t("footer.Email address")
            }}</label>
            <input
              id="button-down-email"
              type="email"
              name="email"
              autocomplete="email"
              required
              class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:placeholder:text-gray-400"
              :placeholder="t('footer.Enter your email')"
            />
            <div class="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:shrink-0">
              <button
                type="submit"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm duration-700 hover:bg-secondary"
              >
                {{ t("footer.Subscribe") }}
              </button>
            </div>
          </form>
          <h3 class="mt-4 text-xl font-medium text-gray-900">
            {{ t("footer.Follow Us") }}
          </h3>
          <div class="mb-4 mt-2 flex justify-center space-x-6">
            <a
              v-for="item in currentSiteSettings?.socials"
              :key="item.url"
              target="_blank"
              :href="item.url"
              class="text-gray-400 duration-700 hover:text-gray-600"
            >
              <span class="sr-only">{{ item.type }}</span>
              <SocialIcon
                :social-type="item.type"
                class="size-6"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="mx-2 border-t border-gray-200">
        <p class="m-2 text-right text-xs text-gray-400">
          by
          <a
            href="https://zagorsolutionsltd.eu/"
            class="duration-700 hover:text-secondary"
            rel="noopener"
            target="_blank"
            >Zagor Solutions Ltd.</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import SocialIcon from "./SocialIcon.vue"

const { primaryLogoUrl, secondaryLogoUrl, siteConfig, currentSiteSettings } =
  storeToRefs(useSiteConfigStore())
const { t } = useI18n()
const route = useRoute()
let showFooterDescription = ref(true)
watch(
  () => route.path,
  (value) =>
    (showFooterDescription.value =
      !value.includes("login") && !value.includes("register")),
)
</script>
<style scoped></style>
