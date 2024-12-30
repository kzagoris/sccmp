import { type Timestamp, type FieldValue } from "@firebase/firestore"
import { Profile } from "./Profile"

export interface Conversation {
  id?: string
  lastMessage: Message | undefined
  lastMessageTimestamp: Timestamp | undefined
  haveUnreadMessages: boolean
  recipient: Profile
  unreadMessagesCount: number | FieldValue
}

export interface Message {
  id?: string
  content: string
  senderId: string
  timestamp: Timestamp
}
