<template>
  <main class="flex flex-1 items-stretch xl:overflow-hidden">
    <aside class="flex w-96 shrink-0 flex-col border-r bg-white">
      <div
        class="flex h-16 items-center justify-between border-b border-gray-200 px-6"
      >
        <h2 class="text-lg font-medium text-gray-900">Conversations</h2>
        <RouterLink to="/conversations/new">
          <PencilSquareIcon
            class="size-5 hover:cursor-pointer"
          ></PencilSquareIcon>
        </RouterLink>
      </div>
      <nav
        class="min-h-0 flex-1 overflow-y-auto border-b border-gray-200"
        aria-label="Directory"
      >
        <div class="relative">
          <ul role="list" class="divide-y divide-gray-100">
            <li
              v-for="conversation in conversations"
              :key="conversation.id"
              :class="{ 'bg-gray-100': conversation.id === props.id }"
              class="flex relative justify-between gap-x-4 py-5 px-4 hover:bg-gray-100"
            >
              <div class="flex grow mr-2 min-w-0 gap-x-4">
                <AvatarImage
                  class="size-12 flex-none rounded-full bg-gray-50"
                  :profile="conversation.recipient"
                />
                <div class="flex-auto">
                  <div class="flex items-baseline justify-between gap-x-4">
                    <p class="text-sm font-semibold leading-6 text-gray-900">
                      <RouterLink
                        :to="`/conversations/show/${conversation.id}`"
                        class="focus:outline-none truncate max-w-40"
                      >
                        <span class="absolute inset-x-0 -top-px bottom-0" />
                        {{ conversation.recipient.firstName }}
                        {{ conversation.recipient.lastName }}
                      </RouterLink>
                    </p>
                    <p class="flex-none text-xs text-gray-600">
                      <time
                        v-if="conversation.lastMessage"
                        :datetime="
                          conversation.lastMessage.timestamp.toString()
                        "
                      >
                        {{
                          formatTimeAgo(
                            conversation.lastMessage.timestamp.toDate(),
                          )
                        }}
                      </time>
                    </p>
                  </div>
                  <p
                    :class="{ 'font-bold': conversation.haveUnreadMessages }"
                    class="mt-1 line-clamp-2 text-sm leading-6 text-gray-600"
                  >
                    {{ conversation.lastMessage?.content }}
                  </p>
                </div>
              </div>
              <div class="flex shrink-0 items-center gap-x-4">
                <ChatBubbleLeftRightIcon
                  v-if="conversation.haveUnreadMessages"
                  class="size-5 flex-none text-blue-700"
                  aria-hidden="true"
                />
                <ChevronRightIcon
                  v-else
                  class="size-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
    <!-- Main content -->
    <article class="flex-1 pb-1">
      <div
        v-if="props.action === 'new' || props.action === 'show'"
        class="flex h-full flex-col bg-white shadow sm:overflow-hidden sm:rounded-lg"
      >
        <div
          v-if="props.action === 'new'"
          class="flex h-16 flex-row items-center justify-start border-y border-gray-200 px-4 sm:px-6"
        >
          <h2
            id="notes-title"
            class="whitespace-nowrap text-lg font-medium text-gray-900"
          >
            Discussion with:
          </h2>
          <Combobox
            class="m-5 w-full"
            as="div"
            :value="recipientProfile"
            @update:model-value="
              (v) => router.push(`/conversations/show/${v.id}`)
            "
          >
            <div class="relative mt-1">
              <ComboboxInput
                ref="comboboxInputDiscussionRef"
                class="w-full rounded-md border border-white bg-white py-2 pl-3 pr-10 shadow-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm"
                :display-value="
                  (person: unknown) => {
                    const displayPerson = person as Profile | null | undefined
                    return !displayPerson
                      ? ''
                      : displayPerson?.firstName + ' ' + displayPerson?.lastName
                  }
                "
                @change="query = $event.target.value"
              />
              <ComboboxButton
                class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
              >
                <ChevronUpDownIcon
                  class="size-5 text-gray-400"
                  aria-hidden="true"
                />
              </ComboboxButton>

              <ComboboxOptions
                v-if="queriedProfilesFiltered.length > 0"
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <ComboboxOption
                  v-for="queriedProfile in queriedProfilesFiltered"
                  :key="queriedProfile.id"
                  v-slot="{ active, selected }"
                  :value="queriedProfile"
                  as="template"
                >
                  <li
                    :class="[
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    ]"
                  >
                    <div class="flex items-center">
                      <AvatarImage
                        class="size-6 shrink-0 rounded-full"
                        :profile="queriedProfile"
                      />
                      <span
                        :class="['ml-3 truncate', selected && 'font-semibold']"
                      >
                        {{ queriedProfile.firstName }}
                        {{ queriedProfile.lastName }}
                        ({{ queriedProfile.email }})
                      </span>
                    </div>

                    <span
                      v-if="selected"
                      :class="[
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-white' : 'text-indigo-600',
                      ]"
                    >
                      <CheckIcon class="size-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </div>
          </Combobox>
        </div>
        <div
          v-else
          class="flex h-16 flex-row items-center justify-start border-y border-gray-200 px-4 sm:px-6"
        >
          <h2 id="notes-title" class="text-lg font-medium text-gray-900">
            Discussion with:
          </h2>
          <AvatarImage
            class="ml-5 size-10 rounded-full"
            :profile="recipientProfile"
          />
          <div class="ml-5 font-medium text-gray-900">
            {{ recipientProfile?.firstName }} {{ recipientProfile?.lastName }}
          </div>
        </div>
        <div
          class="max-h-[75vh] flex-1 overflow-y-scroll overscroll-contain px-4 py-6 sm:px-6"
        >
          <ul role="list" class="space-y-8">
            <li
              v-for="message in viewMessages"
              ref="messageRefs"
              :key="message.id"
            >
              <div
                class="flex space-x-3"
                :class="{ 'flex-row-reverse space-x-reverse': message.isMe }"
              >
                <div class="shrink-0">
                  <AvatarImage
                    :text-color="message.isMe ? 'light' : 'dark'"
                    :color="message.isMe ? 'secondary' : 'gray'"
                    class="size-10 rounded-full"
                    :profile="message.profile"
                  />
                </div>
                <div>
                  <div
                    class="mt-1 text-sm text-gray-700"
                    :class="{ 'text-end': message.isMe }"
                  >
                    <p>{{ message.content }}</p>
                  </div>
                  <div
                    class="mt-2 space-x-2 text-xs"
                    :class="{ 'text-end': message.isMe }"
                  >
                    <span class="font-medium text-gray-500">{{
                      formatTimeAgo(message.date)
                    }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="bg-gray-50 px-4 py-6 sm:px-6">
          <div class="flex space-x-3">
            <div class="shrink-0">
              <AvatarImage
                class="size-10 rounded-full"
                color="secondary"
                text-color="light"
                :profile="profile"
              />
            </div>
            <div class="min-w-0 flex-1">
              <div>
                <label for="comment" class="sr-only">About</label>
                <textarea
                  id="comment"
                  v-model="currentMessage"
                  name="comment"
                  rows="3"
                  class="block w-full rounded-md border border-gray-300 shadow-sm duration-500 focus:border-secondary focus:ring-secondary sm:text-sm"
                  placeholder="Send a message"
                />
              </div>
              <div class="mt-3 flex items-center justify-end">
                <button
                  :disabled="currentMessage.length === 0"
                  type="button"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm duration-700 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-gray-400 disabled:font-normal disabled:italic"
                  @click="addMessage()"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex h-full justify-center items-center flex-col bg-white shadow sm:overflow-hidden sm:rounded-lg"
      >
        <div>
          <RouterLink
            to="/conversations/new"
            class="bg-primary hover:bg-primary-light transition-colors duration-700 text-white font-bold py-2 px-4 rounded"
          >
            Create a new Conversation
          </RouterLink>
          <p class="mt-5">Or Select a Conversation from the List</p>
        </div>
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/outline"
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/vue/20/solid"
import { computed, ComputedRef, nextTick, ref, watch, watchEffect } from "vue"
import AvatarImage from "../components/AvatarImage.vue"
import { useMessages } from "../composables/MessagesFunction"
import { useProfileStore } from "../stores/ProfileStore"
import { Conversation } from "../models/Conversation"
import { Profile } from "../models/Profile"
import { useProfile } from "../composables/ProfileFunction"
import { formatTimeAgo } from "@vueuse/core"
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue"
import { storeToRefs } from "pinia"
import { useCollection, useCurrentUser, useFirestore } from "vuefire"
import { collection } from "@firebase/firestore"
import { RouterLink, useRouter } from "vue-router"

interface ViewComment {
  id: string
  isMe: boolean
  name: string
  date: Date
  profile: Profile
  content: string
}

const props = defineProps<{
  action: "new" | "show" | ""
  id: string
}>()
const router = useRouter()
const db = useFirestore()
const { profile } = storeToRefs(useProfileStore())

const messageRefs = ref<HTMLLIElement[]>([])
const comboboxInputDiscussionRef = ref<typeof ComboboxInput | null>(null)

const user = useCurrentUser()
const { getAllProfiles } = useProfile()

const { getMessages, sendMessage, clearUnreadMessagesCount } = useMessages()

const query = ref("")
const profiles = getAllProfiles()
const queriedProfilesFiltered = computed(() =>
  profiles.value.filter(
    (profile) =>
      profile.id !== user.value?.uid &&
      (profile.firstName.toLowerCase().includes(query.value.toLowerCase()) ||
        profile.lastName.toLowerCase().includes(query.value.toLowerCase()) ||
        profile.email.toLowerCase().includes(query.value.toLowerCase())),
  ),
)

const recipientProfile: ComputedRef<Profile | null> = computed(() => {
  if (props.action === "new") return null
  return (
    queriedProfilesFiltered.value.find((profile) => profile.id === props.id) ??
    null
  )
})

watchEffect(() => {
  if (props.action === "new") {
    nextTick(() => {
      comboboxInputDiscussionRef.value?.el.focus()
    })
  }
})

const conversationRef = computed(() => {
  if (!user.value) return null
  return collection(db, "profiles", user.value.uid, "conversations")
})

const conversations = useCollection<Conversation>(conversationRef)

const conversationId = computed(() => recipientProfile.value?.id ?? null)

watch(conversationId, async (value) => {
  if (!value) return
  const conversation = conversations.value?.find(
    (conversation) => conversation.id === value,
  )
  if (!conversation) return
  await clearUnreadMessagesCount(conversation)
})

const messages = getMessages(conversationId)

const viewMessages = computed(() => {
  if (
    !messages.value ||
    !user.value ||
    !profile.value ||
    !recipientProfile.value
  )
    return []
  return messages.value.map(
    (message) =>
      ({
        id: message.id,
        isMe: message.senderId === user.value!.uid,
        name:
          message.senderId === user.value!.uid
            ? profile.value?.firstName + " " + profile.value?.lastName
            : recipientProfile.value?.firstName +
              " " +
              recipientProfile.value?.lastName,
        date: message.timestamp.toDate(),
        profile:
          message.senderId === user.value!.uid
            ? profile.value
            : recipientProfile.value,
        content: message.content,
      }) as ViewComment,
  )
})

watch(viewMessages, async (value) => {
  if (value.length > 0) {
    await nextTick()
    messageRefs.value[messageRefs.value.length - 1].scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    })
  }
})

const currentMessage = ref("")

async function addMessage() {
  if (
    !recipientProfile.value ||
    !profile.value ||
    currentMessage.value.length === 0
  )
    return
  await sendMessage({
    senderProfile: profile.value,
    recipientProfile: recipientProfile.value,
    content: currentMessage.value,
  })
  currentMessage.value = ""
  messageRefs.value[messageRefs.value.length - 1].scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  })
}
</script>

<style scoped></style>
