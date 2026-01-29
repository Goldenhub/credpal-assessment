/// <reference path="../src/express.d.ts" />

import "reflect-metadata";

import app from "../app";
import config from "../src/config";

const { PORT } = config;

app.listen(PORT, () => {
  console.info(`App 🚀running on Port http://localhost:${PORT}`);
});
