import { z } from "zod";

export const userRegisterSchema = {
  body: z.object({
    first_name: z.string().min(1, "El nombre es obligatorio"),
    last_name: z.string().min(1, "El apellido es obligatorio"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    email: z.string().email("El email no es válido"),
    age: z.number().int().nonnegative("La edad debe ser un número positivo"),
    role: z.enum(["user", "admin"]).optional().default("user"),
  }),
};
