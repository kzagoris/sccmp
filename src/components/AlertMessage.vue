<template>
  <Transition
    enter-from-class="transition-opacity duration-150 opacity-0"
    enter-to-class="transition-opacity duration-150 opacity-100"
    leave-from-class="transition-opacity duration-150 opacity-100"
    leave-to-class="transition-opacity duration-150 opacity-0"
  >
    <div v-if="showAlertMessage" class="absolute top-5 w-full">
      <div
        :class="[
          currentColorTheme.borderColor,
          currentColorTheme.backgroundColor,
        ]"
        class="mx-5 border-l-4 border-r border-y p-4"
      >
        <div class="flex">
          <div class="shrink-0">
            <CheckCircleIcon
              :class="[currentColorTheme.textColorIcon]"
              class="size-5"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3">
            <p
              :class="[currentColorTheme.textColor]"
              class="text-sm font-medium"
            >
              {{ alertMessage }}
            </p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-m-1.5">
              <button
                type="button"
                class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                :class="[
                  currentColorTheme.backgroundColor,
                  currentColorTheme.textColorIcon,
                  currentColorTheme.textColorButtonHover,
                  currentColorTheme.focusRingColor,
                  currentColorTheme.focusRingOffsetColor,
                ]"
                @click="dismiss()"
              >
                <span class="sr-only">Dismiss</span>
                <XMarkIcon class="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XMarkIcon } from "@heroicons/vue/20/solid"
import { useAlertMessageStore } from "../stores/AlertMessageStore"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { colorAlertTheme } from "../helpers/site-settings"

const { showAlertMessage, alertMessage, alertMessageType } = storeToRefs(
  useAlertMessageStore(),
)

const currentColorTheme =
  computed(() => colorAlertTheme[alertMessageType.value]) ??
  colorAlertTheme["success"]

function dismiss() {
  showAlertMessage.value = false
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
