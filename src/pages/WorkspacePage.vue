<template>
  <div
    class="mx-auto max-w-5xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8"
  >
    <main class="lg:col-span-7">
      <div class="px-4 sm:px-0">
        <div class="sm:hidden">
          <label for="question-tabs" class="sr-only">Select a tab</label>
          <select
            id="question-tabs"
            class="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          >
            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav
            class="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            <a
              v-for="(tab, tabIdx) in tabs"
              :key="tab.name"
              :href="tab.href"
              :aria-current="tab.current ? 'page' : undefined"
              :class="[
                tab.current
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white px-6 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10',
              ]"
            >
              <span>{{ tab.name }}</span>
              <span
                aria-hidden="true"
                :class="[
                  tab.current ? 'bg-rose-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                ]"
              />
            </a>
          </nav>
        </div>
      </div>
      <div class="mt-4">
        <h1 class="sr-only">Recent questions</h1>
        <ul role="list" class="space-y-4">
          <li
            v-for="question in articlesWorkspace"
            :key="question.id"
            class="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
          >
            <article :aria-labelledby="'question-title-' + question.id">
              <div>
                <div class="flex space-x-3">
                  <div class="shrink-0">
                    <img
                      class="size-10 rounded-full"
                      :src="question.author.imageUrl"
                      alt=""
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900">
                      <a :href="question.author.href" class="hover:underline">{{
                        question.author.name
                      }}</a>
                    </p>
                    <p class="text-sm text-gray-500">
                      <a :href="question.href" class="hover:underline">
                        <time :datetime="question.datetime">{{
                          question.date
                        }}</time>
                      </a>
                    </p>
                  </div>
                  <div class="flex shrink-0 self-center">
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
                        >
                          <span class="sr-only">Open options</span>
                          <EllipsisVerticalIcon
                            class="size-5"
                            aria-hidden="true"
                          />
                        </MenuButton>
                      </div>

                      <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <MenuItems
                          class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                        >
                          <div class="py-1">
                            <MenuItem v-slot="{ active }">
                              <a
                                href="#"
                                :class="[
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'flex px-4 py-2 text-sm',
                                ]"
                              >
                                <StarIcon
                                  class="mr-3 size-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Add to favorites</span>
                              </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                              <a
                                href="#"
                                :class="[
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'flex px-4 py-2 text-sm',
                                ]"
                              >
                                <CodeBracketIcon
                                  class="mr-3 size-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Embed</span>
                              </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                              <a
                                href="#"
                                :class="[
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'flex px-4 py-2 text-sm',
                                ]"
                              >
                                <FlagIcon
                                  class="mr-3 size-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Report content</span>
                              </a>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>
                </div>
                <h2
                  :id="'question-title-' + question.id"
                  class="mt-4 text-base font-medium text-gray-900"
                >
                  {{ question.title }}
                </h2>
              </div>
              <div
                class="mt-2 space-y-4 text-sm text-gray-700"
                v-html="question.body"
              />
              <div class="mt-6 flex justify-between space-x-8">
                <div class="flex space-x-6">
                  <span class="inline-flex items-center text-sm">
                    <button
                      type="button"
                      class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <HandThumbUpIcon class="size-5" aria-hidden="true" />
                      <span class="font-medium text-gray-900">{{
                        question.likes
                      }}</span>
                      <span class="sr-only">likes</span>
                    </button>
                  </span>
                  <span class="inline-flex items-center text-sm">
                    <button
                      type="button"
                      class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <ChatBubbleLeftEllipsisIcon
                        class="size-5"
                        aria-hidden="true"
                      />
                      <span class="font-medium text-gray-900">{{
                        question.replies
                      }}</span>
                      <span class="sr-only">replies</span>
                    </button>
                  </span>
                  <span class="inline-flex items-center text-sm">
                    <button
                      type="button"
                      class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <EyeIcon class="size-5" aria-hidden="true" />
                      <span class="font-medium text-gray-900">{{
                        question.views
                      }}</span>
                      <span class="sr-only">views</span>
                    </button>
                  </span>
                </div>
                <div class="flex text-sm">
                  <span class="inline-flex items-center text-sm">
                    <button
                      type="button"
                      class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <ShareIcon class="size-5" aria-hidden="true" />
                      <span class="font-medium text-gray-900">Share</span>
                    </button>
                  </span>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </main>
    <aside class="mt-8 block lg:col-span-5 lg:mt-0 lg:block">
      <div class="sticky top-4 space-y-4">
        <section aria-labelledby="trending-heading">
          <div class="rounded-lg bg-white shadow">
            <div class="p-6">
              <h2
                id="trending-heading"
                class="text-base font-medium text-gray-900"
              >
                Your Latest Activity
              </h2>
              <div class="mt-6 flow-root">
                <ul role="list" class="-mb-8">
                  <li
                    v-for="(activityItem, activityItemIdx) in activityWorkspace"
                    :key="activityItem.id"
                  >
                    <div class="relative pb-8">
                      <span
                        v-if="activityItemIdx !== activityWorkspace.length - 1"
                        class="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                      <div class="relative flex items-start space-x-3">
                        <template v-if="activityItem.type === 'comment'">
                          <div class="relative">
                            <img
                              class="flex size-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                              :src="activityItem.imageUrl"
                              alt=""
                            />

                            <span
                              class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px"
                            >
                              <ChatBubbleLeftEllipsisIcon
                                class="size-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div class="min-w-0 flex-1">
                            <div>
                              <div class="text-sm">
                                <a
                                  :href="activityItem.person.href"
                                  class="font-medium text-gray-900"
                                  >{{ activityItem.person.name }}</a
                                >
                              </div>
                              <p class="mt-0.5 text-sm text-gray-500">
                                Commented {{ activityItem.date }}
                              </p>
                            </div>
                            <div class="mt-2 text-sm text-gray-700">
                              <p>{{ activityItem.comment }}</p>
                            </div>
                          </div>
                        </template>
                        <template
                          v-else-if="activityItem.type === 'assignment'"
                        >
                          <div>
                            <div class="relative px-1">
                              <div
                                class="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white"
                              >
                                <UserCircleIcon
                                  class="size-5 text-gray-500"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="min-w-0 flex-1 py-1.5">
                            <div class="text-sm text-gray-500">
                              <a
                                :href="activityItem.person.href"
                                class="font-medium text-gray-900"
                                >{{ activityItem.person.name }}</a
                              >
                              {{ " " }}
                              assigned
                              {{ " " }}
                              <a
                                :href="activityItem.assigned?.href"
                                class="font-medium text-gray-900"
                                >{{ activityItem.assigned?.name }}</a
                              >
                              {{ " " }}
                              <span class="whitespace-nowrap">{{
                                activityItem.date
                              }}</span>
                            </div>
                          </div>
                        </template>
                        <template v-else-if="activityItem.type === 'tags'">
                          <div>
                            <div class="relative px-1">
                              <div
                                class="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white"
                              >
                                <TagIcon
                                  class="size-5 text-gray-500"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="min-w-0 flex-1 py-0">
                            <div class="text-sm leading-8 text-gray-500">
                              <span class="mr-0.5">
                                <a
                                  :href="activityItem.person.href"
                                  class="font-medium text-gray-900"
                                  >{{ activityItem.person.name }}</a
                                >
                                {{ " " }}
                                added tags
                              </span>
                              {{ " " }}
                              <span class="mr-0.5">
                                <template
                                  v-for="tag in activityItem.tags"
                                  :key="tag.name"
                                >
                                  <a
                                    :href="tag.href"
                                    class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                                  >
                                    <span
                                      class="absolute flex shrink-0 items-center justify-center"
                                    >
                                      <span
                                        :class="[
                                          tag.color,
                                          'size-1.5 rounded-full',
                                        ]"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span
                                      class="ml-3.5 font-medium text-gray-900"
                                      >{{ tag.name }}</span
                                    >
                                  </a>
                                  {{ " " }}
                                </template>
                              </span>
                              <span class="whitespace-nowrap">{{
                                activityItem.date
                              }}</span>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="trending-heading">
          <div class="rounded-lg bg-white shadow">
            <div class="p-6">
              <h2
                id="trending-heading"
                class="text-base font-medium text-gray-900"
              >
                Latest Conversations
              </h2>
              <div class="mt-6 flow-root">
                <ul role="list" class="-my-4 divide-y divide-gray-200">
                  <li
                    v-for="post in conversationWorkspacePosts"
                    :key="post.id"
                    class="flex space-x-3 py-4"
                  >
                    <div class="shrink-0">
                      <img
                        class="size-8 rounded-full"
                        :src="post.user.imageUrl"
                        :alt="post.user.name"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm text-gray-800">{{ post.body }}</p>
                      <div class="mt-2 flex">
                        <span class="inline-flex items-center text-sm">
                          <button
                            type="button"
                            class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                          >
                            <ChatBubbleLeftEllipsisIcon
                              class="size-5"
                              aria-hidden="true"
                            />
                            <span class="font-medium text-gray-900">{{
                              post.comments
                            }}</span>
                          </button>
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-6">
                <a
                  href="#"
                  class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Continue to Conversations
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
  HandThumbUpIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/solid"

import {
  articlesWorkspace,
  conversationWorkspacePosts,
  activityWorkspace,
} from "../helpers/fake-data"

const tabs = [
  { name: "Recent", href: "#", current: true },
  { name: "Most Liked Articles", href: "#", current: false },
  { name: "Most Commented", href: "#", current: false },
]
</script>

<style scoped></style>
