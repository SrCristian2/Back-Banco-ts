import mongoose, { Document } from "mongoose";


interface ICredit  extends Document{
  product:string
  client:mongoose.Types.ObjectId
  fiador:string
  imgUrlTitular:string
  imgUrlFiador:string
  totalIntereses:number
  cuotas:number
  totalAPagarCadaCuota:number
  montoAPagar:number
}

const { Schema, model } = mongoose;

const creditSchema = new Schema(
  {
    product: {
      type: String,
      required: [true, "el campo product es requerido"],
      enum: [
        "viviendas",
        "tarjeta de credito",
        "educacion",
        "viajes",
        "libre inversion",
      ],
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
      required: [true, "el campo client es requerido"],
    },

    fiador: {
      type: String,
      required: [true, "el campo fiador es requerido"],
    },

    imgUrlTitular: {
      type: String,
      default: "",
      // required:[true, "DEBES ADJUNTAR IMAGEN DE CEDULA TITULAR"],
    },
    imgUrlFiador: {
      type: String,
      default: "",
      // required:[true, "DEBES ADJUNTAR IMAGEN DE CEDULA FIADOR"],
    },
    totalIntereses: {
      type: Number,
      default: 0,
    },

    cuotas: {
      type: Number,
    },

    totalAPagarCadaCuota: {
      type: Number,
    },

    montoAPagar: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const creditModel = model<ICredit>("credit", creditSchema);
