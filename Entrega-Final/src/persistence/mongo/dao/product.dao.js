import { productModel } from "../models/product.model.js";
import mongoose from "mongoose";

class ProductDao {
  async create(data) {
    try {
      const product = await productModel.create(data);
      return product;
    } catch (error) {
      console.error("Error al crear producto:", error);
      return null;
    }
  }

  async getAll(query, options) {
    try {
      const products = await productModel.paginate(query, options);
      return products;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return null;
    }
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    try {
      const product = await productModel.findById(id);
      return product;
    } catch (error) {
      console.error("Error al buscar producto por ID:", error);
      return null;
    }
  }

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    try {
      const product = await productModel.findByIdAndUpdate(id, data, { new: true });
      return product;
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return null;
    }
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    try {
      const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
      return product;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return null;
    }
  }
}

export const productDao = new ProductDao();
