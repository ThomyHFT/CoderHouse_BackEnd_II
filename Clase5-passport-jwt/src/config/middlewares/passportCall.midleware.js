import passport from "passport";

export const passportCall=(strategy)=>{
    return (req, res, next)=>{
        passport.authenticate(strategy,(err, user, info)=>{

            //validamos si existe un error
            if(err)return next(err);
            //validamos si existe el usuario
            if(!user)return res.status(401).json({message:info.message})
            //si todo sale bien 
            req.user=user;
            next();
        })(req,res,next)
    }
}