// @ts-ignore
import { createTransport } from "nodemailer"

export default async function sendEmail(params: any) {
  const { identifier, from, subject, text, html } = params;
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    secureConnection: false,
    requiresAuth: true,
    port: process.env.EMAIL_SERVER_PORT,
    domains:["gmail.com", "googlemail.com"],
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    },
    tls: {rejectUnauthorized: false}
  })
  const result = await transport.sendMail({
    to: identifier,
    from,
    subject,
    text,
    html,
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}
