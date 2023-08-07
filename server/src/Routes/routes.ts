import express, { Router, Request, Response } from "express";
import { health } from "../Controller/Health/Health.controller";
import { getMessagesFromRedisList, socketConnectionUrl } from "../Controller/Sockets/Sockets.controller";

const router: Router = express.Router();

router.get("/health", health);
router.get("/socketio-url", socketConnectionUrl);
router.post("/get-messages", getMessagesFromRedisList);

export { router };
