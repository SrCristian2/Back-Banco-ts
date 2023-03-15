import { Type } from "@sinclair/typebox";

export const pagosSchema = {
  body: Type.Object({
    credit: Type.String(),
    ahorros: Type.String(),
    cuotas: Type.Number({ minimum: 1, maximum: 5 }),
    monto: Type.Number(),
  }),
};
