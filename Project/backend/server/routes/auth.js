const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../../db/models/UserSchema');
const fetchuser=require('../../middlewares/fetchuser')
// Route 1: Post request to Register A new User
router.post('/register',
  [
       body('email','Enter A Valid Email').isEmail(),
   ],
   
    async(req,res)=>
    {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let success=false;
    try {
        const {username,email,password,confirmpassword}=req.body;
        const emailExist=await User.findOne({email:email});
        if(emailExist){

            return res.status(400).json({success,msg:"User Already exist"}).send(`User Already Exists with UserName: ${emailExist.username}`);
        }

        const hashPassword=await bcrypt.hash(password,10);
    
        const newUser=new User({
            username:username,
            email:email,
            password:hashPassword,
            confirmpassword:hashPassword
        });
      
       const token=await newUser.generateAuthToken();
       
    //    console.log(token);
       success=true;
        const savedUser=await newUser.save();
        res.status(201).json({success,message:"User created Succesfully","token":token});
    } catch (error) {
        res.status(400).send(error);
    }
})

//Route 2: Login 
router.post('/login',async(req,res)=>{
    let success=false;
    const {email,password}=req.body;
    const emailExist=await User.findOne({email:email});
    if(!emailExist){
        
        return res.status(404).json({success:false});
    }
    const passwordCompare=await bcrypt.compare(password,emailExist.password);
    if(!passwordCompare)
    {
        return res.status(404).json({success:false});
    }
    const data={
        user:{
            id:emailExist.id
        }
    }
    const authtoken=jwt.sign(data,"secretKey");
    res.status(201).json({token:authtoken,success:true});
})

router.post('/getuser',fetchuser,async (req,res)=>{ //Here using User id which we will get from authToken we will display user details
    try {                                      //Using auth Token get user Id

     
        // console.log(req.user.id);
        const user_id=(req.user.id);
        
        const user= await User.findById(user_id).select("-password -confirmpassword -tokens");
        if(!user)
        {
            res.status(404).json({"Error":"Invalid Details"});
        }
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("Oops Something went Wrong");
    }
})

module.exports=router;
