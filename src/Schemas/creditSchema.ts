import { Type } from "@sinclair/typebox";


export const creditSchema = {
  body: Type.Object({
    product: Type.String(),
    client: Type.String(),
    fiador: Type.String(),
    cuotas: Type.Number(),
    montoAPagar: Type.Number(),
  }),
};
