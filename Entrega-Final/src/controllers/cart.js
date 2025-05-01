import { cartService } from "../service/cart.service.js";
import { productService } from "../service/product.service.js";
import { ticketService } from "../service/ticket.service.js";
import { sendEmail } from "../utils/email/sendEmail.js";
import {purchaseEmail} from "../utils/email/template/purchaseEmail.js"

class CartController {

    async create(req, res) {
        try {
            const cart = await cartService.createCart();
            res.status(201).json({ status: "ok", cart });
        } catch (error) {
            errorLog(error, req);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async cartById(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

            res.status(200).json({ status: "ok", cart });
        } catch (error) {
            errorLog(error, req);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async addProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const product = await productService.obtenerById(pid); 
            if (!product)
                return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            const cart = await cartService.getCartById(cid);

            if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

            const cartUpdate = await cartService.addProductToCart(cid, pid);

            res.status(200).json({ status: "ok", payload: cartUpdate });
        } catch (error) {
            errorLog(error, req);
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const product = await productService.obtenerById(pid); 
            if (!product)
                return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            const cart = await cartService.getCartById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

            const cartUpdate = await cartService.deleteProductToCart(cid, pid); 

            res.status(200).json({ status: "ok", payload: cartUpdate });
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async updateQuantity(req, res, quantity) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const product = await productService.obtenerById(pid);
            if (!product)
                return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            const cart = await cartService.getCartById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

            const cartUpdate = await cartService.updateQuantityProductInCart(cid, pid, Number(quantity));

            res.status(200).json({ status: "ok", payload: cartUpdate });
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async clearCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartService.clearProductsToCart(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

            res.status(200).json({ status: "ok", cart });
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }

    async purchaseCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid); 
            if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

            const total = await cartService.purchaseCart(cid); 
            const ticket = await ticketService.createTicket(total, req.user.email);
            const plantilla=purchaseEmail(ticket.code, ticket.amount, ticket.purchase_datatime, ticket.purchaser);
            sendEmail(plantilla, req.user.first_name, req.user.email)

            res.status(200).json({ status: "ok", ticket });
        } catch (error) {
            res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
    }
}

export const cartController = new CartController();
