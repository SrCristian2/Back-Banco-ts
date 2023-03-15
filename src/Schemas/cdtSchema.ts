import { Type } from "@sinclair/typebox";

export const cdtSchema = {
  bod: Type.Object({
    client: Type.String(),
    nameBeneficiary: Type.String(),
    contact: Type.String(),
    PlazoDias: Type.Number(),
    montoDeposito: Type.Number(),
  }),
};
