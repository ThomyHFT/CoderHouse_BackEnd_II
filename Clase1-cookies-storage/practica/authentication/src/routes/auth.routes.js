import {Router} from "express";
import useRoutes from "./user.routes.js"
import { userDao } from "../persistence/mongo/dao/user.dao.js";
const router= Router();

router.post("/login", async(req , res)=>{
    try{
        const{email, password}=req.body;
        const user = await userDao.getOne({email, password});
        if(!user){
            return res.status(401).json({message:"no se encontro al usuario"})
        }
        //eliminamos la contraseña
        delete user.password

        req.session.user=user; //guardamos al usuario en la session
        res.status(200).json(user);

    }catch(e){
        console.log("error: "+ e);
        
    }
})

router.post("/register", async(req , res)=>{
    try{
        const{email}=req.body;
        const user = await userDao.getOne({email});
        if(!user){
            const newUser= await userDao.create(req.body);
            res.status(201).json(newUser);
            
        }
        else{
            return res.status(400).json({message:"ya existe el usuario"})
        }
        
        
    }catch(e){
        console.log("error: "+ e);
        
    }
})

router.get("/profile", async(req , res)=>{
    try{
        if(!req.session.user) return res.status(401).json({message:"no hay un usuario logeado"});
        res.status(200).json({user:req.session.user});
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