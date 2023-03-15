import mongoose, { Document } from "mongoose";

interface IEstadistica extends Document {
  cuentasBancarias: number;
  ahorrosTotales: number;
  cuentasBloqueadas: number;
  gananciasTotales: number;
  creditos: number;
  cuentasDeshabilitadas: number;
}

const { Schema, model } = mongoose;

const estadisticaSchema = new Schema(
  {
    cuentasBancarias: {
      type: Number,
      default: 0,
    },
    ahorrosTotales: {
      type: Number,
      default: 0,
    },
    cuentasBloqueadas: {
      type: Number,
      default: 0,
    },
    gananciasTotales: {
      type: Number,
      default: 0,
    },
    creditos: {
      type: Number,
      default: 0,
    },
    cuentasDeshabilitadas: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const estadisticaModel = model<IEstadistica>("estadisticas", estadisticaSchema);
