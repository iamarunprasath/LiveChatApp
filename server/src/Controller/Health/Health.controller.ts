import { Request, Response } from "express";

const health = (req: Request, res: Response) => {
  res.status(200).send("I'm working!");
};

export { health };
