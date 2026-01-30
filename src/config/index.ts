import dotenv from "dotenv";
import dbConnect from "./db";

const isDevelopment = process.env.ENV && process.env.ENV === "development";

if (isDevelopment) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

const config = {
  PORT: process.env.PORT || 4321,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  DB_NAME: process.env.DB_NAME as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  SMTP_HOST: process.env.SMTP_HOST as string,
  SMTP_PASS: process.env.SMTP_PASS as string,
  SMTP_PORT: process.env.SMTP_PORT || 465,
  SMTP_USER: process.env.SMTP_USER as string,
};

export { dbConnect };
export default config;
