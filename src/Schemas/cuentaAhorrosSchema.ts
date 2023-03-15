import { Type } from "@sinclair/typebox";

export const ahorrosSchema={
  body:Type.Object({
    client:Type.String(),
    address:Type.String()
  })
}
