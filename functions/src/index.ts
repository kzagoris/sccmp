import admin from "firebase-admin"
import { firestore, https, logger } from "firebase-functions/v1"
import {
  SMTPConfigType,
  sendResetPasswordEmail,
  sendSignUpEmail,
} from "./email"
import { defineInt, defineString } from "firebase-functions/params"
import { AuthError } from "firebase/auth"

admin.initializeApp()
const SMTPConfig: SMTPConfigType = {
  User: defineString("SMTP_USER"),
  Password: defineString("SMTP_PASSWORD"),
  Server: defineString("SMTP_SERVER"),
  Port: defineInt("SMTP_PORT"),
}

const appDomain = defineString("APP_DOMAIN")
const appName = defineString("APP_NAME")

export const onProfileCreated = firestore
  .document("profiles/{userId}")
  .onCreate(async (snapshot, context) => {
    const profileData = snapshot.data() as {
      firstName: string
      lastName: string
      email: string
      description: string
      age: number
    }
    const { userId } = context.params
    const { email } = snapshot.data()
    await admin.auth().updateUser(userId, {
      displayName: `${profileData.firstName} ${profileData.lastName}`,
    })
    const emailVerificationLink = await admin
      .auth()
      .generateEmailVerificationLink(email, {
        url: `https://app.${appDomain.value()}`,
      })
    await sendSignUpEmail(
      email,
      {
        name: profileData.firstName,
        signupLink: emailVerificationLink,
        currentYear: new Date().getFullYear(),
        appDomain: appDomain.value(),
        appFullName: appName.value(),
        appName: appName.value(),
      },
      SMTPConfig,
    )
  })

export const resetPasswordEmail = https.onCall(async (data) => {
  const { email } = data as { email: string }
  if (!email) {
    logger.log("email is missing", email)
    return
  }
  try {
    const user = await admin.auth().getUserByEmail(email)

    if (user.email !== email) {
      logger.log("email is not equal to user.email", email, user.email)
      return
    }
    const url = `https://app.${appDomain.value()}`

    const passwordResetLink = await admin
      .auth()
      .generatePasswordResetLink(email, {
        url,
      })
    await sendResetPasswordEmail(
      email,
      {
        name: user.displayName ?? user.email?.split("@")?.[0] ?? "",
        currentYear: new Date().getFullYear(),
        resetLink: passwordResetLink,
        appDomain: appDomain.value(),
        appFullName: appName.value(),
        appName: appName.value(),
      },
      SMTPConfig,
    )
    logger.log("password reset email sent", email)
  } catch (error) {
    if ((error as AuthError)?.code === "auth/user-not-found") {
      logger.log("user not found", email)
      return
    }
    logger.log("error", error)
  }
})
