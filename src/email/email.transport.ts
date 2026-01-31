import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import config from "../config";

const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT } = config;

export const mailTransporter = nodemailer.createTransport({
  host: SMTP_HOST,
  //   port: process.env.SMTP_PORT || 465,
  port: Number(SMTP_PORT),
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
} as SMTPTransport.Options);
