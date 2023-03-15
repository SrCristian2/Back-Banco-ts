import { Type } from "@sinclair/typebox";

export const userSchema = {
  body: Type.Object({
    name: Type.String(),
    lastname: Type.String(),
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 5 }),
    // role: Type.String({ examples: ["client", "employee", "admin"] }),
  }),
};
