import { createToken } from "../utils/jwt.js";
import { UserCreateDto } from "../config/dto/userCreateDto.js"; 
import { sendEmail } from "../utils/email/sendEmail.js";
import {registerEmail} from "../utils/email/template/registerEmail.js"


class AuthController{
    async login(req, res){
        try {
            const tokenData = {
              id: req.user._id,
              email: req.user.email,
              role: req.user.role
            }
             const token = createToken(tokenData)
             res.cookie("token", token, {httpOnly: true});
            res.status(200).json({ user: req.user, token });
          } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
          }
    }

    async register(req, res){
        try {
            const user= new UserCreateDto(req.user)
            const plantilla= registerEmail(user.fullName, user.email)
            await sendEmail(plantilla, user.first_name, user.email)
            res.status(201).json({ message: req.user });
          } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
          }
    }

    async profile(req, res){
        try{
            const userProfile= new UserCreateDto(req.user);
            const user={
                user:userProfile.fullName,
                email:userProfile.email,
                age:userProfile.age
            }
            res.status(200).json({user:user});
        }catch(e){
            res.status(400)
        }
    }

    async logout(req, res){
        try{
            if(!req.cookies["token"]) return res.status(401).json({message:"no hay un usuario logeado"});
            res.clearCookie("token")
            res.status(200).json({message:"session finalizada"});
        }catch(e){
            res.status(400)
        }
    }
}

export const authController = new AuthController();