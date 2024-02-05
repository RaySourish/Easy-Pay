
const jwt = require('jsonwebtoken');
const jwtPassword = '12345';


async function verifyJwt(token){

    try {
        const decode = await jwt.verify(token , jwtPassword)
        // console.log(decode)
        return decode;
}
catch(e){
    console.log("error in verifying")
    return null;

}
}

const sign= jwt.sign("sourish",jwtPassword)

console.log(verifyJwt(sign,jwtPassword));
// verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtqbm5ramFuZmduamJmZ2ciLCJwYXNzd29yZCI6IjEyODh5OHl5NXlxOXU0dXE4NHF1NDg5OThxIiwiaWF0IjoxNzA2OTczODY3fQ.51BnGMxGl95pkQPi29SbgY8zJA827Bi7JI4HFsJ6ebU")

// verifyJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtqbm5ramFuZmduamJmZ2ciLCJwYXNzd29yZCI6IjEyODh5OHl5NXlxOXU0dXE4NHF1NDg5OThxIiwiaWF0IjoxNzA2OTczODY3fQ.51BnGMxGl95pkQPi29SbgY8zJA827Bi7JI4HFsJ6ebU')



const authMiddleware= async (req,res,next)=>{

    const authHeader = req.headers.authorization;
    console.log("It is"+authHeader);

    if(!authHeader){
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];
    console.log(token)
    const decode = await verifyJwt(token,jwtPassword)
    console.log("This",decode)
    if(decode) {
        req.userId = decode.username;
        // req.userId = 1234;
        console.log(req.userId)

        // for the verification of the users

        next();
    }

    else {
        res.status(403).json({})
    }
}


module.exports = {
    authMiddleware
}