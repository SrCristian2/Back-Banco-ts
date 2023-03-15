import { consignacion, listAllConsignacion, listAllTranfers, pagos, transfer } from "../controllers/movimientos.controller";
import { isEmployeeOrAdmin, verifyToken } from "../middlewares/authorization";
import { consignacionSchema } from "../Schemas/consignacionSchema";
import { pagosSchema } from "../Schemas/pagosSchema";
import { transferSchema } from "../Schemas/transferSchema";

const middleware = (req: any, reply: any, done: any) => {
  verifyToken(req, reply, done);
};

const employye = (req: any, reply: any, done: any) => {
  isEmployeeOrAdmin(req, reply, done);
};

export const movimientosRoutes = (fastify: any, opts: any, done: any) => {
  fastify.post(
    "/transfer",
    { schema: transferSchema, preHandler: [middleware] },
    transfer
  );
  fastify.get(
    "/listAll",
    { preHandler: [middleware, employye] },
    listAllTranfers
  );
  //consignacion
  fastify.post(
    "/consignacion",
    { schema: consignacionSchema, preHandler: [middleware] },
    consignacion
  );
  fastify.get(
    "/listConsignacion",
    { preHandler: [middleware, employye] },
    listAllConsignacion
  );

  fastify.post(
    "/pagos",
    { schema: pagosSchema, preHandler: [middleware] },
    pagos
  );
  done();
};
