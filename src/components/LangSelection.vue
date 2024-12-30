<template>
  <Listbox v-model="language" as="div">
    <ListboxLabel
      v-if="showLabel"
      class="block text-sm font-medium text-gray-700"
      >{{ t("profile.displayLang") }}</ListboxLabel
    >
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm hover:cursor-pointer focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      >
        <span class="flex items-center">
          <span>{{ language.unicode }}</span>
          <span class="ml-3 block truncate">{{ language.name }}</span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <Transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          :class="props.optionsPlacement === 'top' ? 'bottom-full mb-1' : ''"
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="lang in availableLanguages"
            :key="lang.code"
            v-slot="{ active, selected }"
            as="template"
            :value="lang"
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
                <span>{{ lang.unicode }}</span>
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate',
                  ]"
                >
                  {{ lang.name }}</span
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
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/24/outline"
import { computed } from "vue"
import { getLanguages } from "../helpers/site-settings"
import { storeToRefs } from "pinia"
import { useSiteConfigStore } from "../stores/SiteConfigStore"
import { useI18n } from "vue-i18n"
import { Language } from "../models/Language"
import { getDefaultLanguage } from "../helpers/LocaleFunction"

const props = withDefaults(
  defineProps<{
    modelValue?: Language | null
    optionsPlacement?: "top" | "bottom"
    showLabel?: boolean
  }>(),
  {
    modelValue: null,
    optionsPlacement: "bottom",
    showLabel: true,
  },
)
const emit = defineEmits<{
  "update:modelValue": [value: Language]
}>()
const language = computed({
  get: () => props.modelValue ?? getDefaultLanguage(),
  set: (value: Language) => emit("update:modelValue", value),
})

if (!props.modelValue) {
  language.value = getDefaultLanguage()
}

const { appId } = storeToRefs(useSiteConfigStore())
const availableLanguages = computed(() => getLanguages(appId.value))
const { t } = useI18n({ useScope: "global" })
</script>

<style scoped></style>
