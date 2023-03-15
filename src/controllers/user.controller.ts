import { response } from "../helpers/response";
import { clientModel } from "../models/Users";
import { encryptPassword } from "../helpers/passwordEncrypt";
import { generateToken } from "../helpers/generateToken";
import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../interfaces/comun";



export const register = async (req:FastifyRequest<{Body:IUser}>, reply:FastifyReply) => {
  try {
    const { name, lastname, email, password, role } = req.body;

    const user = await clientModel.findOne({ email });
    if (user) {
      return response(
        reply,
        400,
        false,
        "",
        "email already exists in another account"
      );
    }

    const passwordEncrypt = encryptPassword(password);

    const newUser = new clientModel({
      name,
      lastname,
      email,
      password: passwordEncrypt,
      role,
    });

    await clientModel.create(newUser);
    const token = generateToken({ user: newUser._id });

    response(
      reply,
      201,
      true,
      { ...newUser.toJSON(), password: null, token },
      "user registration successful"
    );
  } catch (error:any) {
    response(reply, 500, false,"", error.message);
  }
};
 
export const login = async (req:FastifyRequest<{Body:{email:string,password:string}}>, reply:FastifyReply) => {
  try {
    const { email, password } = req.body;
    const user = await clientModel.findOne({ email });
    if (user && user.matchPassword(password)) {
      const token = generateToken({ user: user._id });
      return response(
        reply,
        200,
        true,
        { ...user.toJSON(), password: null, token },
        "Welcome"
      );
    }
    response(reply, 400, false, "", "email or password is incorrect");
  } catch (error:any) {
    response(reply, 500, false,"", error.message);
  }
};

