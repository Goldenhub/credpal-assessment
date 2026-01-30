/// <reference path="../src/express.d.ts" />

import "reflect-metadata";
import app from "../app";
import config, { dbConnect } from "../src/config";

const { PORT, DATABASE_URL, DB_NAME } = config;

app.listen(PORT, () => {
  console.info(`App 🚀running on Port http://localhost:${PORT}`);
  dbConnect(DATABASE_URL, DB_NAME);
});
