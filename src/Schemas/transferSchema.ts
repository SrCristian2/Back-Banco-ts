import { Type } from "@sinclair/typebox";

export const transferSchema={
  body:Type.Object({
    cuentaOrigen:Type.String(),
    cuentaDestino:Type.String(),
    monto:Type.Number()
  })
}
  