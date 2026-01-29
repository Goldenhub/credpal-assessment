import type { Request, Response } from "express";

export const unknownRoute = (_req: Request, res: Response) => {
  return res.status(404).json({ err: "Right location, wrong route", statuscode: -1 });
};
