import mongoose, { Document } from "mongoose";

interface ICuenta extends Document {
  client: mongoose.Types.ObjectId;
  saldo: number;
  imgUrl: string;
  address: string;
  isDisabled: boolean;
  public_id: string;
  isBlocked: boolean;
  setImg(image: { secure_url: string; public_id: string }): void;
}

const { Schema, model } = mongoose;

const CuentaDeAhorrosSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
      required: [true, "The client is required "],
    },

    saldo: {
      type: Number,
      default: 0,
    },

    imgUrl: {
      type: String,
    },

    address: {
      type: String,
      required: [true, "The address is required "],
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    public_id: {
      type: String,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

interface image{
  secure_url:string
public_id:string
}

CuentaDeAhorrosSchema.methods.setImg = function setImg({
  secure_url,
  public_id,
}:image) {
  this.imgUrl = secure_url;
  this.public_id = public_id;
};

export const ahorrosModel = model<ICuenta>("ahorros", CuentaDeAhorrosSchema);
