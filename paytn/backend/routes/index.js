const express = require('express');
const userRouter = require("./user");
const { Account } = require('../User');
const AccountRouter = require('./Account')


const router = express.Router();

router.use("/user", userRouter)
router.use("/account",AccountRouter)




router.get('/',(req,res)=>{
    
    res.json({
     "success":"true"
    })
})



module.exports = router;
