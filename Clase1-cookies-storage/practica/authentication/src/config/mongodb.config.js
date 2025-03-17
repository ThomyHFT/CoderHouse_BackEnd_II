import mongoose from "mongoose";

//funcion conexion a mongo

export const connectMongoDb= async()=>{
    try{

        await mongoose.connect("mongodb+srv://thomasferradatorres:Tomix123@cluster0.4tfsv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("✅ connect to mongo");
        
    }catch(e){
        console.log("Error connecting to MongoDB "+ e);
        
    }
}