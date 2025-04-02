import { Router } from "express";
import { passportCall } from "../config/middlewares/passportCall.midleware.js";



const router= Router();

router.get("/current",passportCall("current"), async(req , res)=>{
    try{
        
        res.status(200).json({user:req.user});
    }catch(e){
        res.status(400)
    }
})

export default router;