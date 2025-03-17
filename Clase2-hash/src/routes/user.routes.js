import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";

const router = Router();

router.get("/", async(req, res)=>{
    try{
        const users= await userDao.getAll();
        res.status(200).json({status:"ok", users});
    }catch(e){
        console.log(e);
        res.status(500).json({status:"error", message:"Internal Server Error"});
    }
})

router.get("/:id", async(req, res)=>{
    try{
        const users= await userDao.getOne({_id: req.params.id});
        res.status(200).json({status:"ok", users});
    }catch(e){
        console.log(e);
        res.status(500).json({status:"error", message:"Internal Server Error"});
    }
})

router.post("/", async (req, res)=>{
    try{
        const user= await userDao.create(req.body);
        res.status(200).json({status:"ok", user});
    }catch(e){
        console.log(e);
        res.status(500).json({status:"error", message:"Internal Server Error"});
    }
})

router.put("/:id", async (req, res)=>{
    try{
        const user= await userDao.update(req.params.id, req.body);
        res.status(200).json({status:"ok", message:"user updated"});
    }catch(e){
        console.log(e);
        res.status(500).json({status:"error", message:"Internal Server Error"});
    }
})

router.delete("/:id", async (req, res)=>{
    try{
        const user= await userDao.remove(req.params.id);
        res.status(200).json({status:"ok", message:"user deleted"});
    }catch(e){
        console.log(e);
        res.status(500).json({status:"error", message:"Internal Server Error"});
    }
})



export default router;