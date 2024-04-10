import { Router } from "express";
import isAuth from "../Middlewares/auth.js";
import authRouter from "./auth.js";
import championRouter from "./champions.js";
import fileRouter from "./file.js"

const router = Router();

router.use("/auth", authRouter);

router.use("/Champions", isAuth, championRouter);

router.use("/uploads", fileRouter);

export default router;