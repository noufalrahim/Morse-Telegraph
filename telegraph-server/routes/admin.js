import express from "express";
import { adminLogin } from "../controllers/admin.js";
const router = express.Router();

router.post("/", adminLogin);

export default router;