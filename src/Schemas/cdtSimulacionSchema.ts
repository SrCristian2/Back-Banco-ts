import { Type } from "@sinclair/typebox";


export const cdtSimulacionSchema = {
  body: Type.Object({
    name: Type.String(),
    montoDeposito: Type.Number({ minimum: 1000000, maximum: 1000000000000 }),
    plazoDias: Type.Number({ minimum: 90, maximum: 747 }),
  }),
};
