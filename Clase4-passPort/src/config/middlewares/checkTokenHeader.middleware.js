import jwt from "jsonwebtoken";
import { verifyToken } from "../../utils/jwt.js";
import { userDao } from "../../persistence/mongo/dao/user.dao.js";

export const checkTokenHeader= async(req, res, next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader) return res.status(401).json({message:"no provee token"});

        const token=authHeader.split(" ")[1];

        //decodificar el token
        const decoded= verifyToken(token);
        const user= await userDao.getOne({_id: decoded._id});
        if(!user)return res.status(401).json({message: "usuario no encontrado"});


        //agregamos a la request el usuario
        req.user = user;
        next();


    }catch(e){
        res.send(e.message);
        
        
    }
}