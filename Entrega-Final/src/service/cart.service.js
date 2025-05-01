import { cartDao } from "../persistence/mongo/dao/cart.dao.js";
import { productDao } from "../persistence/mongo/dao/product.dao.js";

class CartServices {
  async createCart() {
    return await cartDao.create();
  }

  async getCartById(cid) {
    return await cartDao.getById(cid);
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);

    const productInCart = cart.products.find((element) => element.product._id.toString() == pid);

    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async deleteProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    cart.products = cart.products.filter((element) => element.product != pid);
    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async updateQuantityProductInCart(cid, pid, quantity) {
    const cart = await cartDao.getById(cid);
    const product = cart.products.find((element) => element.product == pid);
    
    if (!quantity || quantity <= 0) {
      throw new Error('La cantidad no es válida.');
    }

    product.quantity = quantity;
    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async clearProductsToCart(cid) {
    const cartUpdate = await cartDao.update(cid, { products: [] });
    return cartUpdate;
  }

  async purchaseCart(cid) {
    const cart = await cartDao.getById(cid);

    let total = 0; 
    const products = []; 

    for (const productCart of cart.products) {
      const prod = await productDao.getById(productCart.product);
    
      if (prod.stock >= productCart.quantity) {
        total += prod.price * productCart.quantity; 
        await productDao.update(prod._id, { stock: prod.stock - productCart.quantity });
      } else {
        products.push(productCart);
      }
      await cartDao.update(cid, { products });
    }

    return total;
  }
}

export const cartService = new CartServices();
