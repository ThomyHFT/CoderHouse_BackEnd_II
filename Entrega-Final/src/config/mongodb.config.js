import mongoose from "mongoose";
import envsConfig from "./envs.config.js";

export const connectMongoDb= async()=>{
    try{

        await mongoose.connect(envsConfig.MONGO_URL)
        console.log("✅ connect to mongo");
        
    }catch(e){
        console.log("Error connecting to MongoDB "+ e);
        
    }
}