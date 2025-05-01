import { Router } from "express";
import { cartController } from "../controllers/cart.js";
import { authRole } from "../config/middlewares/authRole.middleware.js";
import { errorControl } from "../config/middlewares/errorControl.middleware.js";

const router = Router();

router.get("/:cid", cartController.cartById);

router.get("/:cid/purchase", errorControl("jwt"), authRole(["user"]), cartController.purchaseCart);

router.post("/", errorControl("jwt"),authRole(["user"]) ,cartController.create);

router.post("/:cid/product/:pid",errorControl("jwt"), authRole(["user"]), cartController.addProduct);

router.put("/:cid/product/:pid", cartController.updateQuantity);

router.delete("/:cid/product/:pid", cartController.deleteProduct);

router.delete("/:cid", cartController.clearCart);

export default router;
