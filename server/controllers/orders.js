const Order =require('../model/Orders')
const stripe =require('stripe')(process.env.STRIP_SECRET)
//const User =require('../model/User')


const placeOrder=async(req,res)=>{
        //await User.findByIdAndUpdate(req.body.userId,{cardItems:{}},{ new: true });
            try {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items:req.body.lineItems, // Use line_items from the request body
                    mode: 'payment',
                    success_url: `http://localhost:5173/verifyOrder?success="true"&userEmail=${req.body.userEmail}`,
                    cancel_url:'http://localhost:5173/cancel',
                });
                console.log(session);
                const user =await Order.create(req.body)
                console.log(user)
                res.json({ id: session.id });
            } catch (error) {
                res.status(500).send(error.message);
            }
        
        }

//create complete route
const completeOrder=async(req,res)=>{
    try{
const userEmail=req.user.email
console.log(userEmail)
const order=await Order.find({userEmail})
console.log(order)
res.json({order})
    }catch{
        res.status(404).json({message:"Order not found"})
    }
}

const cancelOrder=async(req,res)=>{
    res.send('your payment is failed')

}

const verifyOrder=async(req,res)=>{
try {
    const {userEmail,success}=req.body
if (success) {
    await Order.findOneAndUpdate({userEmail},{payment:'true'})
    res.json({success:true,message:"Paid"})
}
else{
    res.json({success:false,message:"Not Paid"})
}
} catch (e) {
    res.json({success:false,message:e.message})
} 

}

const deleteOrders=async(req,res)=>{
    try {
       await Order.deleteMany()
       res.json({msg:"delete successfully"})

    } catch (error) {
        console.log(error)
    }
}


module.exports={placeOrder,completeOrder,cancelOrder,verifyOrder,deleteOrders}