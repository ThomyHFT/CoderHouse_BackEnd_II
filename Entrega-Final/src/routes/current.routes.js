import { Router } from "express";
import { errorControl } from "../config/middlewares/errorControl.middleware.js";
import {authController} from "../controllers/auth.js"

const router= Router();

router.get("/current",errorControl("jwt"),authController.profile)

export default router;