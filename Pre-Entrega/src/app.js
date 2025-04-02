import express from "express";
import { connectMongoDb } from "./config/mongodb.config.js";
import router from "./routes/router.js"
import envsConfig from "./config/envs.config.js";
import cookieParser from "cookie-parser";
import passport from "./config/passport/passport.config.js"
const app = express();

connectMongoDb();


app.use(express.json()); //formatea los cuerpos en json las peticiones entrantes
app.use(express.urlencoded({extended:true}));//formatea query paramas

app.use(cookieParser());


app.use(passport.initialize());


app.use("/api", router)



app.listen(envsConfig.PORT, ()=>{
    console.log("server on port: "+envsConfig.PORT );
    
})