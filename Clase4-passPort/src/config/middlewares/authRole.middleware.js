

export const authRole =(role)=>{

    return (req, res, next)=>{
        try{
            if(!req.user)return res.status(400).json({status:"error", msg:"no autenticado"});
            if(!role.includes(req.user.role)) return res.status(403).json({status:"error", msg:"no tienes los permisos adecuados"})
            next();
            
        }catch(e){
            console.log(e);
            

        }
    }
}