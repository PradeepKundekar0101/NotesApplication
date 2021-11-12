const jwt=require('jsonwebtoken');

const fetchuser=(req,res,next)=>{
    console.log("Insise Midleware")
    try {
        const token =req.header('auth_token'); //get the Auth token from req.header
        
        if(!token)
        {
            return res.status(401).send("No Token Provided");
        }
        const data=jwt.verify(token,"secretKey");  //data will store the object 
        req.user=data.user; 
        next();
    } catch (error) {
        res.status(401).send("Invalid Token Provided");
        console.log(error)
    }
}

module.exports=fetchuser;
