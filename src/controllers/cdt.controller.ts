import { response } from "../helpers/response";
import { cdtModel } from "../models/Cdt";
import { clientModel } from "../models/Users";
import { subirImagenACloudinary } from "../helpers/cloudinary.actions";
import { configModel } from "../models/config/config";
import { FastifyReply, FastifyRequest } from "fastify";
import { ICdt, IUploadImage } from "../interfaces/comun";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
    files?: any;
  }
}

export const createCdt = async (
  req: FastifyRequest<{ Body: ICdt }>,
  reply: FastifyReply
) => {
  try {
    const { client, nameBeneficiary, contact, montoDeposito, PlazoDias } =
      req.body;

    const cliente = await clientModel.findById({ _id: client });

    const iva = await configModel.find();

    let interes = iva[0].tasaInteresCdt;
    const retencion = iva[0].retencion;

    let meses = 0;

    if (!cliente) {
      response(reply, 404, false, "", "client not found");
    }

    if (PlazoDias >= 90 && PlazoDias <= 360) {
      interes = interes / 12;

      meses = PlazoDias / 30;
    }

    if (PlazoDias >= 361 && PlazoDias <= 540) {
      interes = 13.5;
      meses = PlazoDias / 30;
    }
    if (PlazoDias >= 541 && PlazoDias <= 747) {
      interes = 14;
      meses = PlazoDias / 30;
    }
    //Esto es la ganancia del cliente
    const tasaDeRetorno = (montoDeposito * interes) / 100;

    //Retencion del gobierno
    const retorno = tasaDeRetorno * meses;

    const retencion1 = (retorno * retencion) / 100;
    //DineroTotal con retencion del gobierno, es el dinero que invirtio mas sus ganancias menos la retencion
    const dineroTotal = retorno + montoDeposito - retencion1;

    const cdt = new cdtModel({
      ...req.body,
      totalGanancia: retorno.toFixed(0),
      retencion: retencion1.toFixed(0),
      gananciaTotal: dineroTotal.toFixed(0),
    });

    interface IImgData {
      secure_url_beneficiario: null | string;
      secure_url_titular: null | string;
      public_id1: null | string;
      public_id2: null | string;
    }

    let imgsData: IImgData = {
      secure_url_beneficiario: null,
      secure_url_titular: null,
      public_id1: null,
      public_id2: null,
    };

    let i = 0;

    if (req.files) {
      for (const file of req.files) {
        const { secure_url, public_id } = (await subirImagenACloudinary(
          file
        )) as IUploadImage;

        if (i === 0) {
          imgsData = {
            ...imgsData,
            secure_url_titular: secure_url,
            public_id1: public_id,
          };
        } else if (i === 1) {
          imgsData = {
            ...imgsData,
            secure_url_beneficiario: secure_url,
            public_id2: public_id,
          };
        }
        i = i + 1;
      }
      cdt.setImg(imgsData);
    }

    await cdtModel.create(cdt);

    response(reply, 201, true, cdt, "cdt created successfully");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const listByIdCdt = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const cdt = await cdtModel.findById(id).populate("users");
    if (!cdt) {
      response(reply, 404, false, "", "cdt not found");
    }
    response(reply, 200, true, cdt, "cdt list successfully");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};

export const simulacionCdt = async (
  req: FastifyRequest<{
    Body: { name: string; montoDeposito: number; plazoDias: number };
  }>,
  reply: FastifyReply
) => {
  try {
    const { name, montoDeposito, plazoDias } = req.body;

    //Tasa de inteseres de acuerdo a los dias

    const iva = await configModel.find();

    let interes = iva[0].tasaInteresCdt;
    const retencion = iva[0].retencion;

    let meses = 0;

    if (plazoDias >= 90 && plazoDias <= 360) {
      interes = interes / 12;

      meses = plazoDias / 30;
    }

    if (plazoDias >= 361 && plazoDias <= 540) {
      interes = 13.5;
      meses = plazoDias / 30;
    }
    if (plazoDias >= 541 && plazoDias <= 747) {
      interes = 14;
      meses = plazoDias / 30;
    }
    //Esto es la ganancia del cliente

    const tasaDeRetorno = (montoDeposito * interes) / 100;

    //Retencion del gobierno

    const retorno = tasaDeRetorno * meses;

    const retencion1 = (retorno * retencion) / 100;

    //DineroTotal con retencion del gobierno, es el dinero que invirtio mas sus ganancias menos la retencion

    const dineroTotal = retorno + montoDeposito - retencion1;

    response(
      reply,
      201,
      true,
      {
        ...req.body,
        retorno: retorno.toFixed(0),
        retencion1: retencion1.toFixed(0),
        dineroTotal: dineroTotal.toFixed(0),
      },
      "cdt simulator successfully"
    );
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};
