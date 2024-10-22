const jwt=require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    const token=req.header("Authorization");

    if(!token){
        return res.json({msg:"Authorization denied, no token is provided"})
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded.id 
        next()
    }
    catch(error){
        res.json({msg:"invalid token"})
    }
}

module.exports=verifyToken