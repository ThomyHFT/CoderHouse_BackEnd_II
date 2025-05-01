import { productService } from "../service/product.service.js";

const INTERNAL_ERROR = { status: "Error", msg: "Error interno del servidor" };

class ProductController {
  async obtenerProductos(req, res) {
    try {
      const { limit, page, sort, category, status } = req.query;

      const options = {
        limit: limit || 10,
        page: page || 1,
        sort: {
          price: sort === "asc" ? 1 : -1,
        },
        learn: true,
      };

      const filters = {};
      if (category) filters.category = category;
      if (status) filters.status = status;

      const products = await productService.getAll(filters, options);
      return res.status(200).json({ status: "ok", products });
    } catch (error) {
      console.log(error);
      res.status(500).json(INTERNAL_ERROR);
    }
  }

  async obtenerById(req, res) {
    try {
      const { pid } = req.params;
      const product = await productService.obtenerById(pid);
      if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

      res.status(200).json({ status: "ok", product });
    } catch (error) {
      console.log(error);
      res.status(500).json(INTERNAL_ERROR);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;
      const product = await productService.deleteProduct(pid);
      if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

      res.status(200).json({ status: "ok", msg: `El producto con el id ${pid} fue eliminado` });
    } catch (error) {
      console.log(error);
      res.status(500).json(INTERNAL_ERROR);
    }
  }

  async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const productData = req.body;

      const product = await productService.updateProduct(pid, productData);
      if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

      res.status(200).json({ status: "ok", product });
    } catch (error) {
      console.log(error);
      res.status(500).json(INTERNAL_ERROR);
    }
  }

  async createProduct(req, res) {
    try {
      const product = req.body;

      const newProduct = await productService.create(product);

      res.status(201).json({ status: "ok", product: newProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json(INTERNAL_ERROR);
    }
  }
}

export const productController = new ProductController();
