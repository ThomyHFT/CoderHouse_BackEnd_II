import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: {
      },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);