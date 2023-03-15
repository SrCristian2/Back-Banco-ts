import { response } from "../helpers/response";
import { ahorrosModel } from "../models/CuentaDeAhorros";
import { cdtModel } from "../models/Cdt";
import { creditModel } from "../models/Credit";
import { estadisticaModel } from "../models/estadisticas";
import { pagosModel } from "../models/Pagos";
import { FastifyReply, FastifyRequest } from "fastify";

export const estadisticas = async (req:FastifyRequest, reply:FastifyReply) => {
  try {
    const accounts = await ahorrosModel.find();

    const cdts = await cdtModel.find();

    const credits = await creditModel.find();

    const blockedAccounts = accounts.filter((item) => item.isBlocked === true);
    const disabledAccounts = accounts.filter(
      (item) => item.isDisabled === true
    );

    disabledAccounts.map((item) => {
      item.saldo = 0;
    });
    
    const ganancia = credits.reduce(
      (acc, account) => acc + account.totalIntereses,
      0
    );

    console.log(ganancia);

    const ahorros = accounts.reduce((acc, account) => acc + account.saldo, 0);

    const newEstadistica = new estadisticaModel({
      cuentasBancarias: accounts.length,
      ahorrosTotales: ahorros,
      cuentasBloqueadas: blockedAccounts.length,
      gananciasTotales: ganancia,
      creditos: credits.length,
      cuentasDeshabilitadas: disabledAccounts.length,
    });

    await newEstadistica.save();

    response(reply, 200, true, newEstadistica, "estadisticas");
  } catch (error:any) {
    return response(reply, 500, false, "", error.message);
  }
};
