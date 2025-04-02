import { Router } from "express";
import authRouter from "./auth.routes.js";
import current from "./current.routes.js"


const router = Router();

router.use("/auth", authRouter);
router.use("/session",current);

export default router;