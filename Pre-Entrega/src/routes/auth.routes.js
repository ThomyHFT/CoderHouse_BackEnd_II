import {Router} from "express";
import { createToken } from "../utils/jwt.js";
import passport from "passport";
import { passportCall } from "../config/middlewares/passportCall.midleware.js";


const router= Router();

router.post("/login", passportCall("login"),async(req , res)=>{
    try{
        const tokenData={
            id:req.user._id,
            email:req.user.email,
            role:req.user.role
        }
        const token = createToken(tokenData)
        res.cookie("token",token,{httpOnly:true});
        res.status(200).json({user:req.user, toke:token})
    }catch(e){
        console.log(e);
        
    }
})

router.post("/register",passport.authenticate("register"),async(req , res)=>{
    try{
        res.status(201).json({message:req.user})
    }
    catch(e){
        res.status(400)
    }
       
})


router.get("/logout", async(req , res)=>{
    try{
        if(!req.cookies["token"]) return res.status(401).json({message:"no hay un usuario logeado"});
        res.clearCookie("token")
        res.status(200).json({message:"session finalizada"});
    }catch(e){
        res.status(400)
    }
})

export default router;