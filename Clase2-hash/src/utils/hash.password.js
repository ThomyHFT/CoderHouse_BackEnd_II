import bcrypt from "bcrypt";


//funcion que hashea la contraseña

export const hashPassword= async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

}

//funcion que compara las contraseñas 

export const compare= async(pwdReciver,pwdUser)=>{
    return await bcrypt.compare(pwdReciver,pwdUser)
}