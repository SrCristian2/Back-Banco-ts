import mongoose, { Document } from "mongoose";

interface IPagos extends Document {
  credit: mongoose.Types.ObjectId;
  ahorros: mongoose.Types.ObjectId;
  cuotas: number;
  monto: number;
}

const { Schema, model } = mongoose;

const pagosSchema = new Schema({
  credit: {
    type: Schema.Types.ObjectId,
    ref: "credit",
    default: "",
  },
  ahorros: {
    type: Schema.Types.ObjectId,
    ref: "ahorros",
  },

  cuotas: {
    type: Number,
    min: 1,
    max: 5,
  },
  monto: {
    type: Number,
    required: [true, "el monto es requerido"],
  },
});

export const pagosModel = model<IPagos>("pagos", pagosSchema);
