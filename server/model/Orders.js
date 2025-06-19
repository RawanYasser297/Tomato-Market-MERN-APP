const mongoose =require('mongoose')

const orderSchema =mongoose.Schema({
   userEmail:{type:String,required:true},
   amount:{type:Number,required:true},
   cartItems:{type:Array,required:true},
   address:{type:Object,required:true},
   lineItems:{type:Object,required:true},
   status:{type:String,default:'Food Processing'},
   Date:{type:Date,default:Date.now()},
   payment:{type:Boolean,default:false},
})


module.exports= mongoose.model('Order', orderSchema);

