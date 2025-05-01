import { z } from "zod";

export const createProductSchema = {
  body: z.object({
    title: z.string().min(1), 
    description: z.string().min(1), 
    price: z.number().positive(), 
    thumbnail: z.array(z.string()).optional(), 
    code: z.string().min(1), 
    stock: z.number().int().nonnegative(), 
    category: z.string().min(1), 
  }),
};

export const editProductSchema = {
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    thumbnail: z.array(z.string()).optional(),
    code: z.string().min(1).optional(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string().min(1).optional(),
  }),
};

export const productIdSchema = {
  params: z.object({
    pid: z.string().min(1), 
  }),
};
