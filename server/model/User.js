const mongoose =require('mongoose')

const userSchema =mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:'user'},
    refreshToken:{type:String},
    cardItems:[Object]
}
)

module.exports= mongoose.model('User', userSchema);
