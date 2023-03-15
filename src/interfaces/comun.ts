import mongoose from "mongoose";

export interface IUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role?: string;
}

export interface ITransfer {
  cuentaOrigen: mongoose.Types.ObjectId;
  cuentaDestino: mongoose.Types.ObjectId;
  monto: number;
}

export interface IConsignacion {
  cuentaDestino: mongoose.Types.ObjectId;
  monto: number;
}

export interface IPagos {
  credit: mongoose.Types.ObjectId;
  ahorros: mongoose.Types.ObjectId;
  cuotas: number;
  monto: number;
}

export interface ICuenta {
  client: mongoose.Types.ObjectId;
  saldo: number;
  imgUrl?: string;
  address: string;
  isDisabled?: boolean;
  public_id?: string;
  isBlocked?: boolean;
}

export interface IUploadImage {
  secure_url: string;
  public_id: string;
}

export interface ICredit {
  product: string;
  client: mongoose.Types.ObjectId;
  fiador: string;
  imgUrlTitular?: string;
  imgUrlFiador?: string;
  totalIntereses?: number;
  cuotas: number;
  totalAPagarCadaCuota?: number;
  montoAPagar?: number;
}

export interface IConfig {
  porcentajeIva: number;
  porcentajeInteresAhorros: number;
  montoDeposito: number;
  porcentajeCreditoAnual: number;
  retencion: number;
  tasaInteresCdt: number;
}

export interface ICdt  {
    client: mongoose.Types.ObjectId;
    nameBeneficiary: string;
    imgUrlTitular?: string;
    imgUrlBeneficiario?: string;
    public_id1?: string;
    public_id2?: string;
    contact: string;
    PlazoDias: number;
    montoDeposito: number;
    totalGanancia?: number;
    retencion?: number;
    gananciaTotal?: number;
  }
