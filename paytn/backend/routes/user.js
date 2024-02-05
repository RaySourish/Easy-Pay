const express = require('express');
const {User,Account} = require('../User')
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwtPassword = '12345'
const jwt = require('jsonwebtoken');
const z = require('zod')
const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');
const { number, string } = require('zod');
const {authMiddleware} = require('../middleware')
mongoose.connect('mongodb+srv://rsourish390:h6UMnqZAppZ5i1pT@ray.pcdducy.mongodb.net/').then(con=>{
  console.log("connection Succesful")
});



const router = express.Router();

// mongoose.connect('mongodb+srv://rsourish390:h6UMnqZAppZ5i1pT@ray.pcdducy.mongodb.net/');

const userschema = z.string().min(3);
const passwordschema = z.string().min(6);
const firstNameSchema = z.string().min(3);
const lastNameSchema  = z.string().min(3);


function validateData(user,pass,first,last){

// const userschema = z.string().min(3);
// const passwordschema = z.string().min(6);

const firstNameSchema = z.string().min(3);
const lastNameSchema  = z.string().min(3);

parsedusername = userschema.safeParse(user)
parsedpassword = passwordschema.safeParse(pass)
parsedfirstName = firstNameSchema.safeParse(first)
parsedLastname= lastNameSchema.safeParse(last)

if(parsedusername&&parsedpassword&&parsedfirstName&&parsedLastname ) return true;

return false;

}


console.log("this",User)


User.findOne({
  username:"Andrew"
}).then(suc=>{
 console.log("Success")

})

function signJwt(username , password,first ,last){
    parsedusername = userschema.safeParse(username)
    parsedpassword = passwordschema.safeParse(password)
    parsedfirstName = firstNameSchema.safeParse(first)
    parsedLastName= lastNameSchema.safeParse(last)

    if(parsedusername&&parsedpassword&&parsedfirstName&&parsedLastName ) {
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

router.get('/',(req,res)=>{
  console.log("hit")
  res.send("Hit")
})

router.post("/signup", async (req, res) => {

console.log('hit');
    try{

    if (signJwt(req.body.username, req.body.password)) {
        const signature = signJwt(req.body.username, req.body.password,req.body.firstName,req.body.lastName);
        // console.log("JWT"+signature);
        console.log(req.body.username)
        const name = req.body.username;

        User.findOne({ username: req.body.username})
            .then(existingUser => {
                if (existingUser) {
                    console.log('User already exists');
                    res.status(203).json({
                        "token":signature,
                        "success":"true"
                    });

                } else {
                    // Create a new user
                    console.log(req.body);
                    User.create(req.body);
                    Account.create({userId:req.body.username,balance:10000})
                        .then(newUser => {
                            console.log('New user added successfully');
                            res.json({
                              "token":signature,
                               
                            });
                        })
                        .catch(error => {
                            console.error('Error adding new user:', error);
                            res.status(500).json({
                                "success": "false",
                                "error": error.message
                            });
                        });
                      
                }
              
            })
            .catch(err => console.log(err));
          }
    }
  catch(error){
    res.json({
      "success":"FALSE",
      "error":error.message
    })
  }
  
  });

  
router.post('/signin',authMiddleware,(req,res)=>{

    try{


      if(req.userId!=req.body.username){
        res.status(404).json({

              "Success":"False"
           
        })
      }
      console.log("this",req.body.username)
      let existuser = null;
  
       User.findOne({username:req.body.username}).then(exist=>{
        console.log(existuser)

        existuser=exist;
       })
  
      if(existuser){
  
        jsonToken = req.body.token
  
       if(verifyJwt(jsonToken,jwtPassword)){
        res.json({
          "succes":"True",
          "User":"Sigin Success"
        })
       }   
       else {
        res.json({
          "success":"True",
          "Error":"Invalid Password"
        })
       }
  
      }
      else {
        res.json({
          "Success":"False",
          "Error":"User not found"
        })
      }
  
    }catch(err){
      res.json({"Success":"False"})
      console.log("There is  a errror here:"+err)
    }
  })


// what is it happening
// app.use(express.urlencoded({ extended: true }));

  router.get('/bulk',authMiddleware,async (req,res)=>{

   try{ let filter =req.query.filter||"";

   console.log(req.query.filter)
   console.log(filter)
  

    // find with queries
    const users = await User.find({
      $or: [{
          firstName: {
              "$regex": filter
          }
      }]
  })
  
  res.json({
    user: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
})
   } catch(err){
    console.log("Error here",err.message)
    res.json({
      "Error":err.message
    })
   }

  })


  const updateBody = z.object({
    password: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
  })
  

  // middle ware add later
  router.put('/user',async (req,res)=>{

    const{success} = updateBody.safeParse(req.body)

    if(!sucess){
      res.status(411).send({})
    } 

    await User.updateOne(req.body, {
      _id: req.userId
  })

  res.json({
      message: "Updated successfully"
  })

  })

  
      
  

module.exports = router;