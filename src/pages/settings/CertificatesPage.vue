<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-5">
    <h1 class="text-3xl font-extrabold text-slate-900">Your Certificates</h1>
  </div>
  <div class="m-10 overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="position in positions" :key="position.id">
        <a href="#" class="block hover:bg-gray-50">
          <div class="p-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="truncate text-sm font-medium text-indigo-600">
                {{ position.title }}
              </p>
              <div class="ml-2 flex shrink-0">
                <p
                  class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                >
                  {{ position.type }}
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500"></p>
                <p
                  class="mt-2 flex items-center text-sm text-gray-500 sm:ml-6 sm:mt-0"
                ></p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <CalendarIcon
                  class="mr-1.5 size-5 shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  on
                  {{ " " }}
                  <time :datetime="position.closeDate">{{
                    position.closeDateFull
                  }}</time>
                </p>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon } from "@heroicons/vue/24/solid"

const positions = [
  {
    id: 1,
    title: "Module 1",
    type: "Expert",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 17, 2020",
  },
  {
    id: 2,
    title: "Module 2",
    type: "Expert",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 2, 2020",
  },
  {
    id: 3,
    title: "Module 3",
    type: "Expert",
    location: "Remote",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 24, 2020",
  },
]
</script>

<style scoped></style>
