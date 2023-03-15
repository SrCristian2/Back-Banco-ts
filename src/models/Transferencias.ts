import mongoose, { Document } from "mongoose";

interface ITransfer extends Document {
  cuentaOrigen: mongoose.Types.ObjectId;
  cuentaDestino: mongoose.Types.ObjectId;
  monto: number;
}

const { Schema, model } = mongoose;

const transferSchema = new Schema({
  cuentaOrigen: {
    type: Schema.Types.ObjectId,
    ref: "ahorros",
    autoPopulate: true,
    required: [true, "el campo cuentaOrigen es obligatorio"],
  },
  cuentaDestino: {
    type: Schema.Types.ObjectId,
    ref: "ahorros",
    autoPopulate: true,
    required: [true, "el campo cuentaDestino es obligatorio"],
  },

  monto: {
    type: Number,
    required: [true, "el campo monto es obligatorio"],
  },
});

export const transferModel = model<ITransfer>("transfer", transferSchema);
