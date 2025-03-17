import express from "express";
import { connectMongoDb } from "./config/mongodb.config.js";
import router from "./routes/router.js"
const app = express();

connectMongoDb();

app.use(express.json()); //formatea los cuerpos en json las peticiones entrantes
app.use(express.urlencoded({extended:true}));//formatea query paramas


//routes

app.use("/api", router)

app.listen(8080, ()=>{
    console.log("server on port 8080");
    
})