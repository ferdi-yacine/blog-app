import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import cookieParser from "cookie-parser";

const router = express.Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//REGISTER
router.get("/logout", logout);

export default router;
