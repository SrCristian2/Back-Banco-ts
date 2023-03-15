import mongoose from "mongoose"
import { env } from "./configEnv";

// ----------------------
mongoose.set('strictQuery', false);
// ----------------------


export const connectDb = async () => {

    try {
        const db = await mongoose.connect(env.MONGO_URI)
        console.log("BASE DE DATOS CONECTADA A:" , db.connection.name);
    } catch (error:any) {
        console.log(`Error al conectarse a la base de datos ${error.message}`);

    }

};