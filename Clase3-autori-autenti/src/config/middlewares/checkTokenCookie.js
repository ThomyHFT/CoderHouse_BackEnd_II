import { verify } from "jsonwebtoken";
import { verifyToken } from "../../utils/jwt.js";

export const checkTokenCookie= async (req,resizeBy,next)=>{
    try{
        const token= req.cookies.token;
        if(!token) return res.status(401).json({message:"no se provee token"});

       const decoded= verifyToken(token);
               const user= await userDao.getOne({_id: decoded._id});
               if(!user)return res.status(401).json({message: "usuario no encontrado"});
       
       
               //agregamos a la request el usuario
               req.user = user;
               next();
       
    }
    catch(e){
        res.send(e.message);
    }
}