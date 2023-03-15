import { Type } from "@sinclair/typebox";

export const consignacionSchema = {
  body: Type.Object({
    cuentaDestino: Type.String(),
    monto: Type.Number(),
  }),
};
