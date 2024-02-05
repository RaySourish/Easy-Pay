
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const { number, string } = require('zod');
mongoose.connect('mongodb+srv://rsourish390:h6UMnqZAppZ5i1pT@ray.pcdducy.mongodb.net/').then(con=>{
  console.log("connection Succesful")
});

// 1. declare the schema
const UserSchema = new Schema({
    username: {type: String, unique: true, required: true,maxLength:30},
    password: {type: String, required: true,minLength:6,trim:true},
    firstName:{type:String ,required:true,maxLength:50,trim:true},
    lastName:{type:String,required:true,maxLength:50,trim:true}
})

// create the model
const User = model("User", UserSchema)



// Account balance

const AccountSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
  const Account = model('Account',AccountSchema);

  // const newAccount = {
  //   userId : "1234",
  //   balance : 20000
  // }

  // Account.create(newAccount).then(out => {
  //   console.log("User Created")
  //   console.log(User)

  // }).catch(err=>{
  //   console.log("during creation")
  // })




  // const newUser = {
    
  //     username:"Andrew",
  //     password:"123456",
  //     firstName:"AndrewH",
  //     lastName:"Huberloss"
    
  // }

  // User.create(newUser)
  User.findOne({
    username:"Andrew"
  }).then(suc=>{
   console.log("Success")

  })


module.exports = {
    User,
    Account
}