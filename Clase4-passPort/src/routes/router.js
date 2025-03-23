import { Router } from "express";
import userRoutes from "./user.routes.js"
import authRouter from "./auth.routes.js"

const router= Router();

router.use("/users", userRoutes)
router.use("/auth", authRouter)

export default router;