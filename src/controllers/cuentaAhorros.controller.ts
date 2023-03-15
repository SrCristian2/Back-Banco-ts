import { response } from "../helpers/response";
import { ahorrosModel } from "../models/CuentaDeAhorros";
import { subirImagenACloudinary } from "../helpers/cloudinary.actions";
import { clientModel } from "../models/Users";
import { FastifyRequest, FastifyReply } from "fastify";
import { ICuenta, IUploadImage } from "../interfaces/comun";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
    file?: any;
  }
}

export const createCuenta = async (
  req: FastifyRequest<{ Body: ICuenta }>,
  reply: FastifyReply
) => {
  try {
    const { client } = req.body;
    const cliente = await clientModel.findById({ _id: client });
    if (!cliente) {
      return response(reply, 404, false, "", `the client does not exist`);
    }

    const newCuenta = new ahorrosModel({
      ...req.body,
    });
    if (req.file) {
      const { secure_url, public_id } = (await subirImagenACloudinary(
        req.file
      )) as IUploadImage;
      newCuenta.setImg({ secure_url, public_id });
    }
    await newCuenta.save();

    const cuenta = await ahorrosModel
      .findById({ _id: newCuenta._id })
      .populate("client", { name: 1, email: 1, role: 1 });

    response(reply, 201, true, cuenta, "account created");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const listByIdCuenta = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const ahorros = await ahorrosModel.findById({ _id: id });
    const cliente = await clientModel.findById({ _id: ahorros!.client });

    if (!ahorros) {
      return response(reply, 404, false, "", `the account does not exist`);
    }

    response(
      reply,
      200,
      true,
      { ...ahorros.toJSON(), client: cliente!.name },
      "account found"
    );
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const blockAccount = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const ahorros = await ahorrosModel.findById(id);
    if (!ahorros) {
      return response(reply, 404, false, "", "Account does not exist");
    }

    if (ahorros.isBlocked === true) {
      return response(reply, 400, false, "", "account already block");
    }
    if (ahorros.isDisabled === true) {
      return response(
        reply,
        400,
        false,
        "",
        "account can't be block because account is disabled"
      );
    }

    await ahorros.updateOne({ isBlocked: true });
    response(reply, 200, true, ahorros, "account succefully block");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const deshabilitarCuenta = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const ahorros = await ahorrosModel.findById(id);
    if (!ahorros) {
      return response(reply, 404, false, "", "Account does not exist");
    }
    if (ahorros.isDisabled === true) {
      return response(reply, 400, false, "", "account alredy disabled");
    }

    await ahorros.updateOne({ isDisabled: true });
    response(reply, 200, true, ahorros, "Account disabled successfully");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};
