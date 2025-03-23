import bcrypt from "bcrypt";


//funcion que hashea la contraseña

export const hashPassword= (password)=>{
    const salt =  bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);

}

//funcion que compara las contraseñas 

export const compare=(pwdReciver,pwdUser)=>{
    return bcrypt.compare(pwdReciver,pwdUser)
}