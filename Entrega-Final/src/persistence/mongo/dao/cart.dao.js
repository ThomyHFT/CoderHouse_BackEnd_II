import { cartModel } from "../models/cart.model.js";

class CartDao {

    async create() {
        try {
            const cart = await cartModel.create({});
            return cart;
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            throw new Error("No se pudo crear el carrito.");
        }
    }

    async getAll() {
        try {
            const allCart = await cartModel.find();
            return allCart;
        } catch (error) {
            console.error("Error al obtener los carritos:", error);
            throw new Error("No se pudieron obtener los carritos.");
        }
    }

    async getById(id) {
        try {
            const cart = await cartModel.findById(id);
            return cart;
        } catch (error) {
            console.error(`Error al obtener el carrito con ID ${id}:`, error);
            throw new Error("No se pudo obtener el carrito.");
        }
    }

    async update(id, data) {
        try {
            const cart = await cartModel.findByIdAndUpdate(id, data, { new: true });
            if (!cart) throw new Error(`Carrito con ID ${id} no encontrado.`);
            return cart;
        } catch (error) {
            console.error(`Error al actualizar el carrito con ID ${id}:`, error);
            throw new Error("No se pudo actualizar el carrito.");
        }
    }

    async delete(id) {
        try {
            const cart = await cartModel.findById(id);
            if (!cart) throw new Error(`Carrito con ID ${id} no encontrado.`);
            await cartModel.deleteOne({ _id: id });
            return { status: "ok", msg: "Carrito eliminado" };
        } catch (error) {
            console.error(`Error al eliminar el carrito con ID ${id}:`, error);
            throw new Error("No se pudo eliminar el carrito.");
        }
    }
}

export const cartDao = new CartDao();
