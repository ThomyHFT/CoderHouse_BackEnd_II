import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt"
import envsConfig from "../envs.config.js";
import { userDao } from "../../persistence/mongo/dao/user.dao.js";

const cookieExtractor= (req)=>{
    let token=null;

    //validamos si existe la request y la cookie

    if(req && req.cookies){
        token=req.cookies.token;
    }

    return token;
}


const jwtOptions={
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]), // Configuramos de donde extraemos el token de las cookies o del headers
    secretOrKey: envsConfig.JWT_SECRET, //Valida si la firma del token es valida

}
const jwtStrategy= new Strategy(jwtOptions,async (payload, done)=>{
    console.log("payload: "+ payload);
    if(payload){
        try{
            const user =await userDao.getOne({email:payload.email})
            return done(null, user)
        }catch(e){
            return done(e)
        }
        
    }
    return done(null,false);
    
})

passport.use("jwt", jwtStrategy)