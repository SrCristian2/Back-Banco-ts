import { upload } from "../middlewares/imgUpload";

import {
  isAdmin,
  isEmployeeOrAdmin,
  verifyToken,
} from "../middlewares/authorization";
import {
  blockAccount,
  createCuenta,
  deshabilitarCuenta,
  listByIdCuenta,
} from "../controllers/cuentaAhorros.controller";
import { ahorrosSchema } from "../Schemas/cuentaAhorrosSchema";

const middleware = (req: any, reply: any, done: any) => {
  verifyToken(req, reply, done);
};

const employye = (req: any, reply: any, done: any) => {
  isEmployeeOrAdmin(req, reply, done);
};

export const ahorrosRoutes = (fastify: any, opts: any, done: any) => {
  fastify.get("/:id", { preHandler: [middleware] }, listByIdCuenta);

  fastify.post(
    "/create",
    {
      schema: ahorrosSchema,
      preValidation: [middleware, employye, upload.single("img")],
    },
    createCuenta
  );

  fastify.put("/:id", { preHandler: [middleware, employye] }, blockAccount);
  fastify.put(
    "/deshabilitar/:id",
    { preHandler: [middleware, employye] },
    deshabilitarCuenta
  );

  done();
};
