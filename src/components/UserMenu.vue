<template>
  <Menu v-slot="{ open }" as="div">
    <div>
      <MenuButton
        v-if="props.isTopMenu"
        class="flex max-w-xs items-center rounded-full bg-white text-sm focus:ring-secondary focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <span class="sr-only">Open user menu</span>
        <AvatarImage
          class="rounded-full bg-gray-300 size-8"
          :profile="profile"
        ></AvatarImage>
        <span
          v-if="((profile?.totalUnreadMessages as number) ?? 0) > 0 && !open"
          class="absolute inline-block rounded-full bg-red-500 px-2 py-1 text-[0.6em] font-bold leading-none text-white"
          :class="{
            'bottom-3 right-4': props.isIconMenu,
            'bottom-[-1em] left-4': !props.isIconMenu,
          }"
        >
          {{ profile?.totalUnreadMessages }}
        </span>
      </MenuButton>
      <MenuButton
        v-else
        class="w-full rounded-md bg-gray-100 py-2 text-left text-sm font-medium text-gray-700 group px-3.5 hover:bg-gray-200 focus:outline-none focus:ring-0"
      >
        <span class="flex w-full items-center justify-between">
          <span class="flex min-w-0 items-center justify-between space-x-3">
            <AvatarImage
              class="shrink-0 rounded-full bg-gray-300 text-xl size-10"
              :profile="profile"
            ></AvatarImage>
            <span
              v-if="
                ((profile?.totalUnreadMessages as number) ?? 0) > 0 && !open
              "
              class="absolute bottom-0 left-10 inline-block rounded-full bg-red-500 px-2 py-1 text-xs font-bold leading-none text-white"
            >
              {{ profile?.totalUnreadMessages }}
            </span>
            <span
              v-if="userName?.length > 0"
              class="flex min-w-0 flex-1 flex-col"
            >
              <span class="truncate text-sm font-medium text-gray-900">{{
                fullName
              }}</span>
              <span class="truncate text-sm text-gray-500"
                >@{{ userName }}</span
              >
            </span>
          </span>
          <ChevronUpDownIcon
            class="shrink-0 text-gray-400 size-5 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </span>
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-95 transform opacity-0"
      enter-to-class="scale-100 transform opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="scale-100 transform opacity-100"
      leave-to-class="scale-95 transform opacity-0"
    >
      <MenuItems
        :class="[
          props.isTopMenu
            ? 'mt-2 w-48 origin-top-right'
            : 'left-0 z-10 mx-3 mt-1 origin-top',
          {
            'bottom-1 left-20': props.isIconMenu,
          },
        ]"
        class="absolute right-0 rounded-md bg-white shadow-lg ring-1 ring-black/5 divide-y divide-gray-200 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <router-link
              to="/settings/profile"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
            >
              {{ t("profile.profile") }}
            </router-link>
          </MenuItem>
          <MenuItem v-slot="{ active }" as="div" class="relative">
            <router-link
              to="/conversations"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              >Messages
            </router-link>
            <span
              v-if="((profile?.totalUnreadMessages as number) ?? 0) > 0"
              class="absolute top-0 left-[7.2em] inline-block rounded-full bg-red-500 px-2 py-1 text-xs font-bold leading-none text-white"
            >
              {{ profile?.totalUnreadMessages }}
            </span>
          </MenuItem>
          <MenuItem v-if="false" v-slot="{ active }">
            <router-link
              to="/settings/certificates"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              >Certificates
            </router-link>
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block w-full px-4 py-2 text-left text-sm',
              ]"
              @click="logoutUser()"
            >
              {{ t("login.Logout") }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"

import { ChevronUpDownIcon } from "@heroicons/vue/20/solid"
import { useUserStore } from "../stores/UserStore"
import { useRouter } from "vue-router"

import AvatarImage from "./AvatarImage.vue"
import { useProfileStore } from "../stores/ProfileStore"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"

const props = defineProps<{
  isTopMenu?: boolean
  isIconMenu?: boolean
}>()
const { logout } = useUserStore()
const { t } = useI18n()
const router = useRouter()

const { profile, userName, fullName } = storeToRefs(useProfileStore())

async function logoutUser() {
  if (await logout()) {
    await router.push("/login")
  }
}
</script>

<style scoped></style>
