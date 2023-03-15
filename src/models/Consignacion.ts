import mongoose, { Document } from "mongoose";

interface IConsignacion extends Document{
  cuentaDestino:mongoose.Types.ObjectId
  monto:number
}

const { Schema, model } = mongoose;

const consignacionSchema = new Schema({
  cuentaDestino: {
    type: Schema.Types.ObjectId,
    ref:"ahorros",
    required: [true, "el campo cuentaDestino es obligatorio"],
  },

  monto: {
    type: Number,
    required: [true, "el campo monto es obligatorio"],
  },
});

export const consignacionModel = model<IConsignacion>("consignaciones", consignacionSchema);
