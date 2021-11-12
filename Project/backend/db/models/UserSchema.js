const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    confirmpassword:{
        type:String,
        require:true
    },
    time:{
        type:Date,
        default:Date.now
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }]
})

userSchema.methods.generateAuthToken=async function(){
    try {
        console.log("Before Generating TOken");
        const token=jwt.sign({_id:this._id.toString()},"thisisasecreatkeyhellopradeepkundekar");
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
    }
}
const User=mongoose.model('User',userSchema);
module.exports=User;