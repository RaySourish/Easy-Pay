const express = require('express')
// const bodyParser = require('body-parser');
const User  = require('./User')
// const {Account} = require("./UserBal
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwtPassword = '12345'
const jwt = require('jsonwebtoken');
const z = require('zod')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rsourish390:h6UMnqZAppZ5i1pT@ray.pcdducy.mongodb.net/');


const rootRouter = require('./routes/index')


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", rootRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
