import { getFirebaseConfig } from "./../helpers/site-settings"
import { initializeApp } from "firebase/app"
import { connectAuthEmulator } from "firebase/auth"
import {
  getFunctions,
  connectFunctionsEmulator,
  Functions,
} from "firebase/functions"
import { connectFirestoreEmulator } from "firebase/firestore"
import { connectStorageEmulator } from "firebase/storage"
import {
  useFirebaseApp,
  useFirebaseAuth,
  useFirebaseStorage,
  useFirestore,
} from "vuefire"

export const useFirebaseEmulator = Boolean(
  import.meta.env.VITE_APP_USE_FIREBASE_EMULATOR === "true",
)

export const getApp = () => {
  const firebaseConfig = getFirebaseConfig()
  if (!firebaseConfig) {
    console.error("firebaseConfig is undefined")
  }
  return initializeApp(firebaseConfig ?? {})
}

export const useFirebaseFunctions = (): Functions => {
  return getFunctions(useFirebaseApp())
}

export const connectEmulators = (): void => {
  const auth = useFirebaseAuth()
  if (auth) connectAuthEmulator(auth, "http://localhost:9099")
  const db = useFirestore()
  connectFirestoreEmulator(db, "localhost", 8080)
  const storage = useFirebaseStorage()
  connectStorageEmulator(storage, "localhost", 9199)
  const functions = useFirebaseFunctions()
  connectFunctionsEmulator(functions, "localhost", 5001)
}
