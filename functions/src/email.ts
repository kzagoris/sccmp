import { StringParam, IntParam } from "firebase-functions/lib/params/types"
import { compile } from "handlebars"
import { TransportOptions, createTransport } from "nodemailer"

type BaseEmailDataType = {
  name: string
  appName: string
  appFullName: string
  appDomain: string
  currentYear: number
}

export type SignUpEmailDataType = BaseEmailDataType & {
  signupLink: string
}

export type PasswordResetEmailDataType = BaseEmailDataType & {
  resetLink: string
}

export type TemplateType = "SignUpNotification" | "PasswordReset"

export type SMTPConfigType = {
  User: StringParam
  Password: StringParam
  Server: StringParam
  Port: IntParam
}

export const sendSignUpEmail = async (to: string, data: SignUpEmailDataType, SMTPConfig: SMTPConfigType) => {
  const from = `no-reply@${data.appDomain}`
  const transporter = createTransport({
    host: SMTPConfig.Server.value(),
    port: SMTPConfig.Port.value(),
    secure: false,
    auth: {
      user: SMTPConfig.User.value(),
      pass: SMTPConfig.Password.value(),
    },
  } as TransportOptions)
  const html = await compileHTMLTemplate("SignUpNotification", data)

  const mailOptions = {
    from,
    to,
    subject: `Welcome to ${data.appFullName}`,
    html,
  }
  return await transporter.sendMail(mailOptions)
}

export const sendResetPasswordEmail = async (
  to: string,
  data: PasswordResetEmailDataType,
  SMTPConfig: SMTPConfigType,
) => {
  const from = `no-reply@${data.appDomain}`
  const transporter = createTransport({
    host: SMTPConfig.Server.value(),
    port: SMTPConfig.Port.value(),
    secure: false,
    auth: {
      user: SMTPConfig.User.value(),
      pass: SMTPConfig.Password.value(),
    },
  } as TransportOptions)
  const html = await compileHTMLTemplate("PasswordReset", data)

  const mailOptions = {
    from,
    to,
    subject: "Reset Your Password",
    html,
  }
  return await transporter.sendMail(mailOptions)
}

async function compileHTMLTemplate(
  template: TemplateType,
  data: SignUpEmailDataType | PasswordResetEmailDataType,
): Promise<string> {
  const templateContent: string = (await import(`./templates/${template}`)).default
  const compiledTemplate = compile(templateContent)
  return compiledTemplate(data)
}
