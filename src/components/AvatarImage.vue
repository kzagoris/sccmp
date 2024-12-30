<template>
  <img
    v-if="props.profile?.photo?.url"
    class="inline-block size-12 rounded-full"
    :src="props.profile?.photo?.url"
    alt=""
  />
  <div
    v-else-if="initials.length > 0"
    class="relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full"
    :class="[bgColor]"
  >
    <span class="font-medium leading-none" :class="txtColor">
      {{ initials }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { InitialProfile } from "../models/Profile"

const props = defineProps<{
  profile?: InitialProfile | undefined | null
  color?: "primary" | "secondary" | "gray"
  textColor?: "light" | "dark"
}>()

const bgColor = computed(() => {
  if (props.color === "primary") {
    return "bg-primary"
  } else if (props.color === "secondary") {
    return "bg-secondary"
  } else if (props.color === "gray") {
    return "bg-gray-100"
  }
  return "bg-gray-100"
})

const txtColor = computed(() => {
  if (props.textColor === "light") {
    return "text-white"
  } else if (props.textColor === "dark") {
    return "text-gray-600"
  }
  return "text-gray-600"
})

const initials = computed(() => {
  if (props.profile && props.profile.firstName && props.profile.lastName) {
    return `${props.profile.firstName[0]}${props.profile.lastName[0]}`
  }
  return ""
})
</script>

<style scoped></style>
