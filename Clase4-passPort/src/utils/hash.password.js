import bcrypt from "bcrypt";


//funcion que hashea la contraseña

export const hashPassword= (password)=>{
    const salt =  bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);

}

//funcion que compara las contraseñas 

export const compare=(pwdReciver,pwdUser)=>{
    return bcrypt.compareSync(pwdReciver,pwdUser)
}