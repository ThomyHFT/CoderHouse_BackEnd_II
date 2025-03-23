import express from "express";
import { connectMongoDb } from "./config/mongodb.config.js";
import router from "./routes/router.js"
import session from "express-session";
import envsConfig from "./config/envs.config.js";
import cookieParser from "cookie-parser";
import passport from "./config/passport/passport.config.js"
const app = express();

connectMongoDb();


app.use(express.json()); //formatea los cuerpos en json las peticiones entrantes
app.use(express.urlencoded({extended:true}));//formatea query paramas
app.use(
    session({
    secret:envsConfig.SESSION_SECRET, //clave para firmar la cookie
    resave: true, //evita guardar la sesisin si no hay cambios
    saveUninitialized:true, //gurda sesiones vacias
    cookie:{secure:false} //debe estar en true si uso https
})
);

app.use(cookieParser());

//inicializar las estrategias de passport 

app.use(passport.initialize());


//routes

app.use("/api", router)



app.listen(envsConfig.PORT, ()=>{
    console.log("server on port: "+envsConfig.PORT );
    
})