const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
var cors = require('cors')
app.use(cors());

app.use(express.json());
app.use(cookieParser());

const errorMiddleware=require("./middleware/error")

//route imports
const product=require('./routes/productRoute');
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1/",user);
app.use("/api/order",order);

app.use(errorMiddleware);

module.exports=app;
module.exports=app;