const mongoose=require('mongoose');

const uri="mongodb://localhost:27017/notes";
const connect= ()=>{
    mongoose.connect(uri,()=>{
        console.log("Connected to DB Successfully");
    })
}
module.exports=connect;