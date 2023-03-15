
import { createCdt, listByIdCdt, simulacionCdt } from "../controllers/cdt.controller";
import {
  isEmployeeOrAdmin,
  verifyToken,
} from "../middlewares/authorization";
import { upload } from "../middlewares/imgUpload";
import { cdtSchema } from "../Schemas/cdtSchema";
import { cdtSimulacionSchema } from "../Schemas/cdtSimulacionSchema";

const middleware = (req:any, reply:any, done:any) => {
  verifyToken(req, reply, done);
};

const employee = (req:any, reply:any, done:any) => {
  isEmployeeOrAdmin(req, reply, done);
};

export const cdtRoutes = (fastify:any, opts:any, done:any) => {
  fastify.get("/:id", { preHandler: middleware }, listByIdCdt);

  fastify.post(
    "/create",
    {
      schema: cdtSchema,
      preValidation: [middleware, employee, upload.array("imgs")],
    },
    createCdt
  );
  fastify.post(
    "/simulacion",
    { schema: cdtSimulacionSchema, },
    simulacionCdt
  );
  done();
};
