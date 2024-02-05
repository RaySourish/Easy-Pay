const express = require('express');
const { Account } = require('../User');
const z = require("zod");
const { authMiddleware } = require('../middleware');

const router = express.Router();



router.get('/',(req,res)=>{
    res.send("Route Created")
})


router.get('/balance',authMiddleware,(req,res)=>{

    try{
    const userId = req.userId;
    console.log(userId);
    console.log("this is")
    // const userId = 1234;

    Account.findOne({userId:userId}).then(result=>{
        res.json({
            userId : userId,
            balance:result.balance
        })
    }).catch(err=>{
        res.json({
            Error : "Invalid UserId"
        })
    })
}
catch(err){
    res.json({
        Error:err.message
    })
}


})

// authentication 
//

const receiverSchema = z.string().min(3);
const balschema  = z.number().min(1);



router.post('/transfer',(req,res)=>{


    // const userId = req.userId
    const userId = 1234


    
    // const receiver = receiverSchema.safeParse(req.body.to)
    // const bal = balSchema.safeParse(req.body.amount)
    // all the authentication and transaction propertis are left

    console.log(req.body)

    console.log("hit")
    // res.status(200).json({})

    if(!transferFunds(req.body.userId,req.body.to,req.body.amount)) {
        res.status(400).json({})
    }

    res.status(200).json({
        Transfer:"Success"
    })


})

async function transferFunds(sender,receiver,amount){

        const result = await Account.findOne({userId:receiver})

        if(!result) return false;
        
        // result.balance+=amount;
        // const senderBal =  await Account({userid:sender})
        // senderBal.balance-=amount;

        console.log(sender,receiver,amount)
        await Account.updateOne({
            userId: sender
        }, {
            $inc: {
                balance: -amount
            }
        })
    
        await Account.updateOne({
            userId: receiver
        }, {
            $inc: {
                balance: amount
            }
        })


        return true;




}       


module.exports = router;