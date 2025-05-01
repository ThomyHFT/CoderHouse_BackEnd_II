import {Router} from "express";
import {authController} from "../controllers/auth.js";
import {schemaValidator} from "../config/middlewares/schemaValidator.js";
import {userRegisterSchema} from "../schemas/userSchema.js"
import {errorControl} from "../config/middlewares/errorControl.middleware.js"

const router= Router();

router.post("/login", errorControl("login"), authController.login);

router.post("/register",schemaValidator(userRegisterSchema),errorControl("register"), authController.register);

router.get("/logout",authController.logout)

export default router;