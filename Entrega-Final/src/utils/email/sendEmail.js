import nodemailer from "nodemailer";
import envsConfig from "../../config/envs.config.js";


export const sendEmail = async (template, subject, email) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "thomasferradatorres@gmail.com",
      pass: envsConfig.EMAIL_PASS
    }
  })
  await transport.sendMail({
    from: "thomasferradatorres@gmail.com",
    to: email,
    subject: subject,
    html:template,
  })
}