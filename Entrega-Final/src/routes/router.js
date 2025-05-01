import { Router } from "express";
import authRouter from "./auth.routes.js";
import current from "./current.routes.js";
import product from "./product.routes.js"
import cart from "./cart.routes.js"


const router = Router();

router.use("/auth", authRouter);
router.use("/session",current);
router.use("/product",product);
router.use("/cart",cart);

export default router;