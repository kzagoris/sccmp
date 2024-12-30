<template>
  <main class="flex-1">
    <div class="flex flex-1 flex-col">
      <div
        class="min-w-0 flex-1 divide-y divide-gray-200 border-b border-gray-200"
      >
        <h1 class="m-5 text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Settings - {{ route.name }}
        </h1>
      </div>
      <div>
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
          <select
            id="tabs"
            name="tabs"
            class="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
            @change="goToTab($event)"
          >
            <option
              v-for="tab in activeSubNavigation"
              :key="tab.name"
              :selected="tab.current"
            >
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden sm:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex justify-evenly space-x-8" aria-label="Tabs">
              <router-link
                v-for="tab in activeSubNavigation"
                :key="tab.name"
                :to="tab.to"
                :class="[
                  tab.current
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                ]"
                :aria-current="tab.current ? 'page' : undefined"
              >
                <component
                  :is="tab.icon"
                  :class="[
                    tab.current
                      ? 'text-primary'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 size-5',
                  ]"
                  aria-hidden="true"
                />
                <span>{{ tab.name }}</span>
              </router-link>
            </nav>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute, RouterLink, RouterView, useRouter } from "vue-router"
import { useUserMenuNavigation } from "../../composables/UserMenuNavigationFunction"

const { activeSubNavigation } = useUserMenuNavigation()
const route = useRoute()
const router = useRouter()

function goToTab(event: Event) {
  const tabName = (event.target as HTMLInputElement)?.value
  if (!tabName) return
  router.push(tabName)
}
</script>

<style scoped></style>
