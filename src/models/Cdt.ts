import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

interface ICdt extends Document {
  client: mongoose.Types.ObjectId;
  nameBeneficiary: string;
  imgUrlTitular: string;
  imgUrlBeneficiario: string;
  public_id1: string;
  public_id2: string;
  contact: string;
  PlazoDias: number;
  montoDeposito: number;
  totalGanancia: number;
  retencion: number;
  gananciaTotal: number;
  setImg(image: {
    secure_url_beneficiario: null | string;
    secure_url_titular: null | string;
    public_id1: null | string;
    public_id2: null | string;
  }): void;
}

const cdtSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
      required: [
        true,
        "ES NECESARIA LA ID DEL CLIENTE PARA REALIZAR ESTE PROCESO",
      ],
    },

    nameBeneficiary: {
      type: String,
      required: [true, "ES NECESARIO NOMBRE DEL BENEFICIARIO"],
    },

    imgUrlTitular: {
      type: String,
      default: "",
      // required:[true, "DEBES ADJUNTAR IMAGEN DE CEDULA TITULAR"],
    },
    imgUrlBeneficiario: {
      type: String,
      default: "",
      // required:[true, "DEBES ADJUNTAR IMAGEN DE CEDULA BENEFICIARIO"],
    },

    public_id1: {
      type: String,
    },
    public_id2: {
      type: String,
    },

    contact: {
      type: String,
      required: [true, "ES NECESARIO EL NUMERO DE CONTACTO DE CLIENTE"],
      maxLength: [
        10,
        "EL NUMERO DE CONTACTO NO ES VALIDO (DEBE CONTENER 10 CARACTERES)",
      ],
      minLength: [
        10,
        "EL NUMERO DE CONTACTO NO ES VALIDO (DEBE CONTENER 10 CARACTERES)",
      ],
    },

    montoDeposito: {
      type: Number,
      default: 0,
    },

    PlazoDias: {
      type: Number,
      required: [true, "PLAZO EN DIAS ES NECESARIO"],
      default: 0,
    },
    totalGanancia: {
      type: Number,
      default: 0,
    },

    retencion: {
      type: Number,
      default: 4,
    },

    gananciaTotal: {
      type: Number,
      default: 0,
    },

    // ExpirationDate: { type: Date, required: [true, ""] },
    // default:  "90"
  },
  { timestamps: true }
);

interface image {
  secure_url_beneficiario: string;
  secure_url_titular: string;
  public_id1: string;
  public_id2: string;
}

cdtSchema.methods.setImg = function setImg({
  secure_url_beneficiario,
  secure_url_titular,
  public_id1,
  public_id2,
}: image) {
  this.imgUrlBeneficiario = secure_url_beneficiario;
  this.imgUrlTitular = secure_url_titular;

  this.public_id1 = public_id1;

  this.public_id2 = public_id2;
};

export const cdtModel = model<ICdt>("cdt", cdtSchema);
