import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  confirmPasswordReset,
} from "firebase/auth"
import { httpsCallable } from "firebase/functions"
import { defineStore } from "pinia"

import { useFirebaseAuth, useFirestore } from "vuefire"
import { useFirebaseFunctions } from "../composables/FirebaseFunction"

export const useUserStore = defineStore("user", () => {
  const firebaseAuth = useFirebaseAuth()!

  const db = useFirestore()

  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
    return true
  }

  const resetPassword = async (email: string) => {
    // call callable firestore function sendPasswordResetEmail
    const functions = useFirebaseFunctions()
    const resetPasswordEmail = httpsCallable(functions, "resetPasswordEmail")
    await resetPasswordEmail({ email })
    return true
  }

  const newResetPassword = async ({
    oobCode,
    newPassword,
  }: {
    oobCode: string
    newPassword: string
  }) => {
    await confirmPasswordReset(firebaseAuth, oobCode, newPassword)
    return true
  }

  const logout = async () => {
    await firebaseAuth.signOut()
    return true
  }

  const register = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  return {
    auth: firebaseAuth,
    database: db,
    login,
    logout,
    register,
    resetPassword,
    newResetPassword,
  }
})
