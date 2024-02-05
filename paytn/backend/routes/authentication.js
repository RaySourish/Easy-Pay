
const z= require('zod')
const jwt = require('jsonwebtoken')


const userschema = z.string().min(3);
const passwordschema = z.string().min(6);



console.log("this",User)


function signJwt(username , password){
    parsedusername = userschema.safeParse(userschema)
    parsedpassword = passwordschema.safeParse(password)

    if(parsedusername && parsedpassword) {
        const signature = jwt.sign({username,password},jwtPassword)

        return signature;
    }
    return null;

}

function verifyJwt(token){

    try {
        const decode = jwt.verify(token , jwtPassword)
        return true;
}
catch(e){
    console.log("error in verifying")
    return false;

}
}


module.exports={
signJwt,
verifyJwt
}