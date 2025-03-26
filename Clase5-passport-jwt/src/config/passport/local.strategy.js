import passport from "passport";
import {Strategy} from "passport-local";
import { userDao } from "../../persistence/mongo/dao/user.dao.js";
import { hashPassword } from "../../utils/hash.password.js";
import { compare, compareSync } from "bcrypt";

//Estrategia de registro

const registerStrategy= new Strategy(
    //en el body de passport viene por defecto el username y password
    //en el middleware en vez de next es done
    {passReqToCallback:true, usernameField:"email"},
    async(req,username,password,done)=>{
        try{
            const user = await userDao.getOne({email:username});
            if(user)return done(null,false,{message:"El usuario ya existe"});
            const newCart=cartDao.create();
            //En caso de que el usuario no este registrado, procedemos con el registro

            const newUser={
                ...req.body,
                password:hashPassword(password),
                cart:newCart._id
            };

            const userCreate=await userDao.create(newUser);
            return done(null,userCreate,{message:"Usuario registrado correctamente"});
        }catch(e){
            done(e)
        }
        
    }
);

//registramos la estrategia de register
passport.use("register", registerStrategy);


//Estrategia de login

const loginStrategy= new Strategy(
    {usernameField:"email"},
    async (username, password,done)=>{
        try{
            const user= await userDao.getOne({email: username})
            if(!user || !compare(user.password, password))return done(null, false,{messgae:"email o password invalidos"})
            

            //en caso de que las credenciales este correctas
            return done(null,user);
        }catch(e){
            done(e)
        }
    }
)


//registramos la estraegtia de login en passport
passport.use("login", loginStrategy);


//serializar al usuario
passport.serializeUser((user,done)=>{
    done(null,user._id);
})

//deserializacion del usuario

passport.deserializeUser(async(id , done)=>{
    try{
        const user=await userDao.getOne({_id:id})
        done(null,user)
    }
    catch(e){
        done(e)
    }
})