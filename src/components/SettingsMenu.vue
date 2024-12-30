<template>
  <nav
    aria-label="Sections"
    class="flex w-96 shrink-0 flex-col border-r border-slate-200 bg-white"
  >
    <div class="flex h-16 shrink-0 items-center border-b border-slate-200 px-6">
      <p class="text-lg font-medium text-slate-900">Settings</p>
    </div>
    <div class="min-h-0 flex-1 overflow-y-auto">
      <router-link
        v-for="item in activeSubNavigation"
        :key="item.name"
        :to="item.to"
        :class="[
          item.current ? 'bg-blue-50/50' : 'hover:bg-blue-50/50',
          'flex border-b border-slate-200 p-6',
        ]"
        :aria-current="item.current ? 'page' : undefined"
      >
        <component
          :is="item.icon"
          class="-mt-0.5 size-6 shrink-0 text-slate-400"
          aria-hidden="true"
        />
        <div class="ml-3 text-sm">
          <p class="font-medium text-slate-900">{{ item.name }}</p>
          <!-- <p class="text-slate-500 mt-1">{{ item.description }}</p> -->
        </div>
      </router-link>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useUserMenuNavigation } from "../composables/UserMenuNavigationFunction"

const { activeSubNavigation } = useUserMenuNavigation()
</script>
<style scoped></style>
