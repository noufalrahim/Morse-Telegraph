import express from "express";
import { createUser, getUsers, deleteUser, checkUser } from "../controllers/users.js";
const router = express.Router();

router.post("/", createUser);

router.get("/", getUsers);

//new
router.post("/auth", checkUser);

router.delete("/:userid", deleteUser);

export default router;