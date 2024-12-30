import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  Timestamp,
  writeBatch,
  increment,
} from "firebase/firestore"
import { computed, Ref } from "vue"
import {
  useCollection,
  useCurrentUser,
  useDocument,
  useFirestore,
} from "vuefire"
import { Conversation, Message } from "../models/Conversation"
import { Profile } from "../models/Profile"

export const useMessages = () => {
  const db = useFirestore()
  const user = useCurrentUser()

  async function sendMessage({
    senderProfile,
    recipientProfile,
    content,
  }: {
    senderProfile: Profile
    recipientProfile: Profile
    content: string
  }) {
    const senderId = user.value?.uid
    if (!senderId) throw new Error("User is not logged in")

    const message: Message = {
      content,
      senderId,
      timestamp: Timestamp.now(),
    }

    const batch = writeBatch(db)

    // Add the message to the conversation for the sender
    const conversationSender: Conversation = {
      lastMessage: message,
      lastMessageTimestamp: message.timestamp,
      haveUnreadMessages: false,
      unreadMessagesCount: 0,
      recipient: { ...recipientProfile, id: recipientProfile.id },
    }
    const senderConversationRef = doc(
      db,
      "profiles",
      senderId,
      "conversations",
      recipientProfile.id,
    )
    batch.set(senderConversationRef, conversationSender)

    const senderMessageRef = doc(
      collection(db, senderConversationRef.path, "messages"),
    )
    batch.set(senderMessageRef, message)

    // Add the message to the conversation for the recipient
    const recipientConversationRef = doc(
      db,
      "profiles",
      recipientProfile.id,
      "conversations",
      senderId,
    )
    const profileRecipientRef = doc(db, "profiles", recipientProfile.id)
    const conversationRecipient: Conversation = {
      lastMessage: message,
      lastMessageTimestamp: message.timestamp,
      haveUnreadMessages: true,
      unreadMessagesCount: increment(1),
      recipient: { ...senderProfile, id: senderProfile.id },
    }
    batch.set(recipientConversationRef, conversationRecipient, { merge: true })
    batch.update(profileRecipientRef, {
      totalUnreadMessages: increment(1),
    })

    const recipientMessageRef = doc(
      collection(db, recipientConversationRef.path, "messages"),
    )
    batch.set(recipientMessageRef, message)

    await batch.commit()
    console.info("Message sent")
  }

  function getMessages(conversationId: Ref<string | null>) {
    const senderId = user.value?.uid
    if (!senderId) throw new Error("User is not logged in")

    const messagesQuery = computed(() => {
      if (!conversationId.value) return null
      const messagesRef = collection(
        db,
        "profiles",
        senderId,
        "conversations",
        conversationId.value,
        "messages",
      )
      return query(messagesRef, orderBy("timestamp", "asc"))
    })
    return useCollection<Message>(messagesQuery)
  }

  async function clearUnreadMessagesCount(conversation: Conversation) {
    const senderId = user.value?.uid
    if (!senderId) throw new Error("User is not logged in")
    if (!conversation.id) throw new Error("Conversation id is not defined")
    const conversationRef = doc(
      db,
      "profiles",
      senderId,
      "conversations",
      conversation.id,
    )
    const profileRef = doc(db, "profiles", senderId)

    const batch = writeBatch(db)
    batch.update(conversationRef, {
      unreadMessagesCount: 0,
      haveUnreadMessages: false,
    })

    batch.update(profileRef, {
      totalUnreadMessages: increment(-conversation.unreadMessagesCount),
    })
    await batch.commit()
  }

  function getOrCreateConversation(
    recipientProfile: Profile,
  ): Ref<Conversation | null | undefined> {
    const senderId = user.value?.uid
    if (!senderId) throw new Error("User is not logged in")
    const conversationRef = doc(
      db,
      "profiles",
      senderId,
      "conversations",
      recipientProfile.id,
    )
    const initialConversation = {
      id: undefined,
      lastMessage: undefined,
      lastMessageTimestamp: undefined,
      haveUnreadMessages: false,
      recipient: recipientProfile,
    } as Conversation

    const conversation = useDocument<Conversation>(conversationRef)
    if (!conversation.value) {
      setDoc(conversationRef, initialConversation).then(() => {
        console.info("Conversation created")
      })
    }
    return conversation
  }

  return {
    sendMessage,
    clearUnreadMessagesCount,
    getMessages,
    getOrCreateConversation,
  }
}
