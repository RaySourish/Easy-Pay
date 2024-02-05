
const mongoose = require('mongoose');
const { number } = require('zod');
const { Schema, model } = require('mongoose');


mongoose.connect('mongodb+srv://rsourish390:h6UMnqZAppZ5i1pT@ray.pcdducy.mongodb.net/');

// 1. declare the schema
const AccountSchema = new Schema({
    username: {type: String, unique: true, required: true},
    balance: {type: String, required: true}
})

// create the model
const Account = model("UserBal", AccountSchema)



// const user = new userSchema({ name: 'Sourish Ray',balance :1200000 });
// User.save().then(() => console.log('meow'));


module.exports = Account;