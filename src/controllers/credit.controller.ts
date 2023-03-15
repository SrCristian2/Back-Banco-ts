import { response } from "../helpers/response";
import { creditModel } from "../models/Credit";
import { clientModel } from "../models/Users";

import { configModel } from "../models/config/config";
import { FastifyReply, FastifyRequest } from "fastify";
import { ICredit } from "../interfaces/comun";

export const createCredit = async (
  req: FastifyRequest<{ Body: ICredit }>,
  reply: FastifyReply
) => {
  try {
    const { product, client, fiador, cuotas, montoAPagar } = req.body;

    const iva = await configModel.find();

    const porcentaje = iva[0].porcentajeCreditoAnual;

    //Valor del Iva

    const valorIvaDelCredito = (montoAPagar! * porcentaje) / 100;

    //Valor completo con el iva
    const totalGanancia = valorIvaDelCredito * cuotas;

    const montoTotal = valorIvaDelCredito + montoAPagar!;

    const cuota = montoTotal / cuotas;

    const cliente = await clientModel.findById({ _id: client });
    if (!cliente) {
      return response(reply, 404, false, "", `the client does not exist`);
    }

    const newCredit = new creditModel({
      ...req.body,
      totalAPagarCadaCuota: cuota.toFixed(0),
      montoAPagar: montoTotal.toFixed(0),
      totalIntereses: valorIvaDelCredito.toFixed(0),
    });

    await creditModel.create(newCredit);

    response(
      reply,
      201,
      true,
      newCredit,
      "credit has been created successfully"
    );
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const listByIdCredit = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const credit = await creditModel
      .findById({ _id: id })
      .populate("client", { name: 1, email: 1, role: 1 });

    if (!credit) {
      return response(reply, 404, false, "", `the credit does not exist`);
    }

    response(reply, 200, true, credit, "Credit found");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};
