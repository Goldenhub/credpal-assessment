import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import { errorHandler, unknownRoute } from "./src/middlewares";
import router from "./src/routes";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.redirect("/api/v1");
});
app.get("/api/v1", (_req: Request, res: Response) => {
  res.json({ msg: `welcome to Todos Tracker API` });
});

app.use("/api/v1", router);
app.use(unknownRoute);
app.use(errorHandler);

export default app;
