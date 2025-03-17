import express from "express";
import { connectMongoDb } from "./config/mongodb.config.js";
import router from "./routes/router.js"
import session from "express-session";
const app = express();

connectMongoDb();

app.use(express.json()); //formatea los cuerpos en json las peticiones entrantes
app.use(express.urlencoded({extended:true}));//formatea query paramas
app.use(
    session({
    secret:"secreto-super-seguro", //clave para firmar la cookie
    resave: true, //evita guardar la sesisin si no hay cambios
    saveUninitialized:true, //gurda sesiones vacias
    cookie:{secure:false} //debe estar en true si uso https
})
);


//routes

app.use("/api", router)


app.listen(8080, ()=>{
    console.log("server on port 8080");
    
})