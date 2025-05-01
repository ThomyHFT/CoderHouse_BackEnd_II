import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "product", 
            required: true 
          },
          quantity: { 
            type: Number, 
            required: true, 
            min: 1, 
          },
        },
      ],
      required: true,
    },
  }
);

export const cartModel = mongoose.model(cartCollection, cartSchema);
