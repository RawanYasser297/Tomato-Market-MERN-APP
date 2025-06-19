require('dotenv').config()
const jwt =require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
try{
    console.log("authorization")
const authorization =req.headers.Authorization ||req.headers.authorization 

if (!authorization.startsWith('Bearer', 0)) {
    return res.status(401).json({ message: "Unauthorized" });
}
const accessToken =authorization.split(' ')[1];
jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,(error,decoded)=>{
    if (error) {
        return res.status(403).send({ message: "Invalid token" });
        }
        req.user=decoded;
        console.log(decoded)
        //{ email: 'aly777@gmail.com',role: 'admin', iat: 1730155360, exp: 1730155480 }
        next();
})
}catch(err){
    res.status(401).json({message:err.message})
}

}

module.exports=verifyToken