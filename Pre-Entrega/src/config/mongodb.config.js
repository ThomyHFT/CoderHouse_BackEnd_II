import mongoose from "mongoose";
import envsConfig from "./envs.config.js";

//funcion conexion a mongo

export const connectMongoDb= async()=>{
    try{

        await mongoose.connect(envsConfig.MONGO_URL)
        console.log("✅ connect to mongo");
        
    }catch(e){
        console.log("Error connecting to MongoDB "+ e);
        
    }
}