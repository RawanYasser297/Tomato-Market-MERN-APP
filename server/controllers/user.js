const User =require('../model/User')
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken')
const saltRounds = 10;
const validator =require('validator')
//register
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const register = async (req, res) => {
    const { username, email, password ,confirmPassword} =req.body;
    if(!username){
        return res.status(400).json({
            msg: "username is required",
            type:"name"
        })
    }
    if(emailRegex.test(email)){
        return res.status(400).json({
            msg: "email is required",
            type:"email"
        })
    }
    
        if(!password){
            return res.status(400).json({msg: "Please enter your password",type:"password"})
        }
    
    if(!confirmPassword){
        return res.status(400).json({
            msg: "confirmPassword is required",
            type:"confirmPassword"
        })
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({msg: "Please enter a valid email",type:'email'})
    }
    if(password !== confirmPassword){
        return res.status(400).json({msg:"Passwords do not match",type:"confirmPassword"})
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({msg: "Email already exists",type:"email"})
    }
    
        try {
            const hashedPassword= await bcrypt.hash(password,saltRounds)
            console.log(hashedPassword)
            const user = await User.create({username,email,password:hashedPassword});
            res.status(200).json({user});
        }catch(err){
            console.log(err);
        }
    

}


//login

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email){
            return res.status(400).json({msg: "Please enter your email address",type:"email"})
        }
        if(!password){
            return res.status(400).json({msg: "Please enter your password",type:"password"})
        }
        const user =await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Email is not exist",type:"email" });
        }

       

        const comparePassword =await bcrypt.compare(password,user.password)
        if(!comparePassword) return res.status(402).json({ msg: "password is false",type:"password"})
        console.log(user)
    
const accessToken =jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
    
const refreshToken = jwt.sign({email},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'24h'})
if (refreshToken.length>0) {
    user.refreshToken =refreshToken;
    user.save();
}

const userToken=user?.refreshToken
if(userToken){
    res.cookie('jwt',refreshToken,{
        httpOnly:true,
        maxAge:24*60*60*1000,
        sameSite:'none',
        secure:true,
    })
}
res.status(200).json({user,accessToken});

}catch(err){
        console.log(err);
    }
}

const refreshAccessToken =async(req,res)=>{
    const refreshToken =req.cookies.jwt
    if(!refreshToken){
        return res.status(401).json({message: "Please login first"})
        }
    console.log("refreshAccessToken"+refreshToken)
    try{
    if(refreshToken.length>0){
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,{},async(err,data)=>{
        if(err) return res.status(401).json({msg:"refreshToken is false"})
            console.log(data.email)
        const email= data.email
        const user =await User.findOne({email:email});
    if (!user) {
        return res.status(400).json({ message: "Email is not exist" });
        }
        console.log(user.email)
    const accessToken =jwt.sign({email:user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1m'})
    res.status(200).json({user,accessToken})
    });

}

}catch(err){
    return res.status(500).json({ message: "bad request" });
}
}


const updateUserData =async(req,res)=>{
    const email=req.user.email
    console.log("update" + email)
    try{
        
        const user=await User.findOne({email})
        console.log("update" + user)
        if(!user){
            return res.status(404).json({message:'User not found'})
        }

        const userID=user._id
          const updatedData=await User.findByIdAndUpdate(userID,{cardItems:{}},{ new: true });
          console.log(updatedData)
          res.json({updatedData})
    }catch{
        res.status(401).json({message:'Unauthorized'})
    }
}


const logOut=(req,res)=>{
    const jwt =req.cookies.jwt 
console.log(jwt)
    if(!jwt) return res.status(400).json({msg:"jwt token is not available "})
        
     res.clearCookie('jwt',jwt,{
        httpOnly:true,
        maxAge:24*60*60*1000,
        sameSite:'none',
        secure:true,
    }).json({msg:"logged out"})
}


module.exports={register,login,refreshAccessToken,updateUserData,logOut}

