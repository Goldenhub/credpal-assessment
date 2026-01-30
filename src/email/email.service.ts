import config from "../config";
import { mailTransporter } from "./email.transport";

const { SMTP_USER } = config;

export async function sendEmail(data: { to: string; subject: string; html: string }) {
  mailTransporter.sendMail({
    from: `"Todo Tracker" <${SMTP_USER}>`,
    ...data,
  });
}
