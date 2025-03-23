import {Router} from "express";
import useRoutes from "./user.routes.js"
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { hashPassword } from "../utils/hash.password.js";
import { compare } from "bcrypt";
import { authRole } from "../config/middlewares/authRole.middleware.js";
import { createToken } from "../utils/jwt.js";
import { checkTokenHeader } from "../config/middlewares/checkTokenHeader.middleware.js";
import cookieParse from "cookie-parser";
import { checkTokenCookie } from "../config/middlewares/checkTokenCookie.js";

const router= Router();

router.post("/login", async(req , res)=>{
    try{
        const{email, password}=req.body;
        const user = await userDao.getOne({email});
        if(!user || !(compare(password,user.password))){
            return res.status(401).json({message:"email o contraseña incorrectos"})
        }

        req.session.user=user; //guardamos al usuario en la session

        //creamos un token

        const tokenInfo={
            _id:user._id,
            email: user.email,
            role:user.role
        }

        const token= createToken(tokenInfo);

        //guardamos nuestro token en una cookie

        res.cookie("token",token,{httpOnly:true});
        
        res.status(200).json({user,token});

    }catch(e){
        console.log("error: "+ e);
        
    }
})

router.post("/register", async(req , res)=>{
    try{
        const{email}=req.body;
        const user = await userDao.getOne({email});
        if(!user){

            const newUserData={
                ...req.body,
                password: hashPassword(req.body.password)
            }
            const newUser=  await userDao.create(newUserData);
            res.status(201).json(newUser);
            
        }
        else{
            return res.status(400).json({message:"ya existe el usuario"})
        }
        
        
    }catch(e){
        console.log("error: "+ e);
        
    }
})

router.get("/profile",checkTokenCookie,authRole(["admin","user"]), async(req , res)=>{
    try{
        
        res.status(200).json({user:req.user});
    }catch(e){
        res.status(400)
    }
})

router.get("/logout", async(req , res)=>{
    try{
        if(!req.session.user) return res.status(401).json({message:"no hay un usuario logeado"});
        req.session.destroy();
        res.status(200).json({message:"session finalizada"});
    }catch(e){
        res.status(400)
    }
})

export default router;