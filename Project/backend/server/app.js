const express=require("express");
const cors=require('cors');
const app=express();
const connect=require('../db/connect');


app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hello');
})
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));

connect();
app.listen(5000,()=>{
    console.log("App Listening at Port 5000");
})