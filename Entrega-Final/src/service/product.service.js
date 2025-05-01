 import {productDao} from "../persistence/mongo/dao/product.dao.js"

class ProductService{
    async create(product){
        return await productDao.create(product);
    }

    async updateProduct(id, data){
        return await productDao.update(id, data);
    }

    async deleteProduct(id){
        return await productDao.delete(id)
    }

    async obtenerById(id){
        return await productDao.getById(id);
    }

    async getAll(query, options){
        return await productDao.getAll(query, options)
    }
}

export const productService= new ProductService();