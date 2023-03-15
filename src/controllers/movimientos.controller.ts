import { FastifyReply, FastifyRequest } from "fastify";
import { response } from "../helpers/response";
import { IConsignacion, IPagos, ITransfer } from "../interfaces/comun";
import { consignacionModel } from "../models/Consignacion";
import { creditModel } from "../models/Credit";
import { ahorrosModel } from "../models/CuentaDeAhorros";
import { pagosModel } from "../models/Pagos";
import { transferModel } from "../models/Transferencias";

export const transfer = async (
  req: FastifyRequest<{ Body: ITransfer }>,
  reply: FastifyReply
) => {
  try {
    const { cuentaOrigen, cuentaDestino, monto } = req.body;
    const rootAccount = await ahorrosModel.findById({ _id: cuentaOrigen });

    const destinyAccount = await ahorrosModel.findById({ _id: cuentaDestino });

    if (!rootAccount || !destinyAccount) {
      return response(reply, 404, false, "", `account not found`);
    }

    if (rootAccount.isBlocked === true || destinyAccount.isBlocked === true) {
      return response(reply, 400, false, "", `accounts is blocked`);
    }

    if (rootAccount.isDisabled === true || destinyAccount.isDisabled === true) {
      return response(reply, 400, false, "", `account is disabled `);
    }

    if (rootAccount.saldo < monto) {
      return response(reply, 400, false, "", `insufficient funds`);
    }

    const saldo = rootAccount.saldo;

    await rootAccount.updateOne({ saldo: saldo - monto });
    await destinyAccount.updateOne({ saldo: saldo + monto });

    const newTransfer = new transferModel({
      ...req.body,
    });

    await newTransfer.save();

    response(reply, 201, true, newTransfer, "Transfer Success");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const listAllTranfers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const transfers = await transferModel.find();

    response(reply, 200, true, transfers, "transfer's list");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const consignacion = async (
  req: FastifyRequest<{ Body: IConsignacion }>,
  reply: FastifyReply
) => {
  try {
    const { cuentaDestino, monto } = req.body;

    const destinyAccount = await ahorrosModel.findById({
      _id: cuentaDestino,
    });

    if (!destinyAccount) {
      return response(reply, 404, false, "", `account not found`);
    }

    if (destinyAccount.isBlocked == true) {
      return response(reply, 400, false, "", `accounts is blocked`);
    }

    if (destinyAccount.isDisabled === true) {
      return response(reply, 400, false, "", `account is disabled `);
    }

    const saldo1 = destinyAccount.saldo;

    const newConsignacion = new consignacionModel({
      ...req.body,
    });

    await destinyAccount.updateOne({ saldo: saldo1 + monto });

    await newConsignacion.save();

    response(reply, 201, true, newConsignacion, "consignment Success");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const listAllConsignacion = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const consignaciones = await consignacionModel.find();

    response(reply, 200, true, consignaciones, "consignment's list");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const pagos = async (
  req: FastifyRequest<{ Body: IPagos }>,
  reply: FastifyReply
) => {
  try {
    const { credit, ahorros, monto, cuotas } = req.body;

    const product = await creditModel.findOne({ _id: credit });

    const total = product!.totalAPagarCadaCuota * cuotas;

    if (monto < total) {
      return response(
        reply,
        400,
        false,
        "",
        `the amount entered does not correspond to the total amount payable ${total}`
      );
    }

    if (ahorros) {
      const account = await ahorrosModel.findById({ _id: ahorros });

      if (!account) {
        return response(reply, 404, false, "", "account not found");
      }

      if (account.saldo < monto) {
        return response(
          reply,
          400,
          false,
          "",
          "la cuenta no tiene saldo suficiente"
        );
      }

      const newPago1 = new pagosModel({
        ...req.body,
      });

      await product!.updateOne({
        montoAPagar: product!.montoAPagar - monto,
        cuotas: product!.cuotas - cuotas,
      });

      await ahorrosModel.updateOne({ saldo: account.saldo - monto });

      await pagosModel.create(newPago1);

      response(reply, 200, true, newPago1, "payment success");
    }
    //fin if ahorros

    const newPago = new pagosModel({
      ...req.body,
    });

    await product!.updateOne({
      montoAPagar: product!.montoAPagar - monto,
      cuotas: product!.cuotas - cuotas,
    });

    await pagosModel.create(newPago);

    response(reply, 201, true, newPago, "pago Success");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const listAllPago = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const pagos = await pagosModel.find();

    response(reply, 200, true, pagos, "pago's list");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};
