import mongoose, { Document } from "mongoose";

interface IConfig extends Document {
  porcentajeIva: number;
  porcentajeInteresAhorros: number;
  montoDeposito: number;
  porcentajeCreditoAnual: number;
  retencion: number;
  tasaInteresCdt: number;
}

const { Schema, model } = mongoose;

const configSchema = new Schema({
  porcentajeIva: {
    type: Number,
    default: 19,
  },

  porcentajeInteresAhorros: {
    type: Number,
    default: 2,
  },
  montoDeposito: {
    type: Number,
  },
  porcentajeCreditoAnual: {
    type: Number,
    default: 15,
  },
  retencion: {
    type: Number,
    default: 4,
  },
  tasaInteresCdt: {
    type: Number,
    default: 13,
  },
});

export const configModel = model<IConfig>("config", configSchema);
