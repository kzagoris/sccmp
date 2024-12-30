import { Language } from "./Language"
import { Country } from "./Country"
import { Photo } from "./Photo"
import { type Timestamp, type FieldValue } from "firebase/firestore"

export interface InitialProfile {
  firstName: string
  lastName: string
  email: string
  description: string
  age: number
  language: Language | null
  country: Country | null
  photo: Photo | null
  lastUpdated: Timestamp | null
  totalUnreadMessages?: number | FieldValue
}

export interface Profile extends InitialProfile {
  id: string
}
