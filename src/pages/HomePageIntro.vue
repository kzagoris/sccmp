<template>
  <div class="mx-auto max-w-4xl mt-10 bg-gray-50 p-5">
    <div class="bg-white p-6 shadow">
      <div class="mt-8 px-4 py-5 sm:p-6">
        <h3
          class="flex mb-9 gap-2 text-xl font-semibold leading-6 text-gray-900"
        >
          {{ t("home.intro.title") }}
        </h3>
        <p class="mb-3">
          {{ t("home.intro.description-1") }}
        </p>
        <p class="mb-3">
          {{ t("home.intro.description-2") }}
        </p>
        <p class="mb-3">
          {{ t("home.intro.description-3") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<style scoped></style>
