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
import passport from "passport";

const router= Router();

router.post("/login", passport.authenticate("login"),async(req , res)=>{
    try{
        res.status(200).json({user:req.user})
    }catch(e){
        console.log(e);
        
    }
})

router.post("/register", passport.authenticate("register"),async(req , res)=>{
    try{
        res.status(201).json({message:req.user})
    }
    catch(e){
        res.status(400)
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