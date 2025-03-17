import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";

const app = express();

app.use(express.static("public"));
app.use(cookieParser("miClaveSecreta"));

///-------COOKIES-------///

// // setear una cookie
// app.get("/set-cookie", (req, res)=>{
//     // crear una cookie
//     // res.cookie("nombreDeCookie", "valor de la cookie")
//     res.cookie("nombre", "Juan Perez");
//     res.send("Cookie guardada");
// })
// //obtener una cookie
// app.get("/get-cookie", (req, res)=>{
//     // obetner una cookie
//     const cookie= req.cookies.nombre
//     res.send("Cookie:"+ cookie);
// })

// //setear una cookie con httponly

// app.get("/set-httponly-cookie", (req, res)=>{
   
//     res.cookie("sessionId", "abc123", {maxAge:3600000, httpOnly:true})
//     res.send("cookie httpOnly establecida")
// })

// //obtener una cookie con httponly
// app.get("/get-httponly-cookie", (req, res)=>{
   
//     const sessionID=req.cookies.sessionId;
//     res.send(sessionID)
// })

// app.get("/delete-httponly-cookie", (req, res)=>{
//     res.clearCookie("sessionID");
//     res.send("cookie eliminada")

// })

// app.get("/set-secure-signed-cookie", (req, res)=>{
   
//     res.cookie("secureToken", "random12432", {
//         maxAge:3600000, 
//         httpOnly:true,
//         secure:true,
//         sameSite: "strict",
//         signed: true
//     })

//     res.send("cookie firmada y segura")
// })

// app.get("/get-secure-signed-cookie", (req, res)=>{
   
//     const secureToken=req.signedCookies.secureToken;
//     res.send(secureToken)
// })



///-------COOKIES-------///



///-------Sessions-------///

app.use(
    session({
    secret:"secreto-super-seguro", //clave para firmar la cookie
    resave: true, //evita guardar la sesisin si no hay cambios
    saveUninitialized:true, //gurda sesiones vacias
    cookie:{secure:false} //debe estar en true si uso https
})
);

//ruta que almacena una session

app.get("/set-session", (req,res)=>{
    //definir los datos de la session
    req.session.usuario = {nombre:"juan", rol:"admin"}
    res.send("Sesion guardada");
});

app.get("/get-session", (req,res)=>{
    //obetner los datos de la sesion

    const sessionData= req.session.usuario;
    res.send(sessionData);
});

//ruta para destruir una sesion

app.get("/logout", (req,res)=>{
    req.session.destroy();
    res.send("sesion finalizada")
});



app.listen(8080, ()=>{
    console.log("server on port 8080");
    
})