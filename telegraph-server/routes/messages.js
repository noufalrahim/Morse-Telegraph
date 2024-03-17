import express from "express";
import { createMessage, getBroadCastMessages, getMessages, getRecievedMessages } from "../controllers/messages.js";
const router = express.Router();

router.post("/", createMessage);

router.get("/", getMessages);
router.get("/message/:id", getRecievedMessages);
router.get("/broadcast", getBroadCastMessages);

export default router;