import express, { Router, Request, Response } from "express";
import { health } from "../Controller/Health/Health.controller";
import { socketConnection } from "../Controller/Sockets/Sockets.controller";

const router: Router = express.Router();

router.get("/health", health);
router.get("/socketio", socketConnection);

export { router };
