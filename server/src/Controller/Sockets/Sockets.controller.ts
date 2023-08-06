import { Request, Response } from "express";

const socketConnection = (req: Request, res: Response) => {
  const socketIoServerUrl = "http://localhost:5000"; // Update with your Socket.IO server URL
  res.json({ socketIoServerUrl });
};

export { socketConnection };
