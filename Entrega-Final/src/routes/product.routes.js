import {Router} from "express";
import {productController} from "../controllers/product.js"
import {createProductSchema, editProductSchema, productIdSchema} from "../schemas/productSchema.js"
import {schemaValidator} from "../config/middlewares/schemaValidator.js"
import {authRole} from "../config/middlewares/authRole.middleware.js"
import { errorControl } from "../config/middlewares/errorControl.middleware.js";

const router = Router();

router.get("/", productController.obtenerProductos);

router.get("/:pid",schemaValidator(productIdSchema), productController.obtenerById );

router.post("/",errorControl("jwt"),authRole(["admin"]),schemaValidator(createProductSchema), productController.createProduct);

router.delete("/:pid",errorControl("jwt"),authRole(["admin"]),schemaValidator(productIdSchema), productController.deleteProduct);

router.put("/:pid",errorControl("jwt"),authRole(["admin"]),schemaValidator(editProductSchema), productController.updateProduct);

export default router;