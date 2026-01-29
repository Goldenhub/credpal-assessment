import dotenv from "dotenv";

const isDevelopment = process.env.ENV && process.env.ENV === "development";

if (isDevelopment) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

const config = {
  PORT: process.env.PORT || 4321,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
};

export default config;
