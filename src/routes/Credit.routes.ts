import { creditSchema } from "../Schemas/creditSchema";
import { upload } from "../middlewares/imgUpload";
import { verifyToken, isEmployeeOrAdmin } from "../middlewares/authorization";
import { createCredit, listByIdCredit } from "../controllers/credit.controller";

const middleware = (req: any, reply: any, done: any) => {
  verifyToken(req, reply, done);
};

const employye = (req: any, reply: any, done: any) => {
  isEmployeeOrAdmin(req, reply, done);
};

export const creditRoutes = (fastify: any, opts: any, done: any) => {
  fastify.get("/:id", listByIdCredit);

  fastify.post(
    "/create",
    {
      schema: creditSchema,
      preValidation: [middleware, employye, upload.single("img")],
    },
    createCredit
  );

  done();
};
