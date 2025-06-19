const {login,register,refreshAccessToken,updateUserData, logOut}=require('../controllers/user')
const {placeOrder,completeOrder,cancelOrder, verifyOrder,getOrderItems,deleteOrders}=require('../controllers/orders')
const express =require('express')
const verifyToken =require('../middleware/verifyToken');
const usersRoute = express.Router()
usersRoute.get('/refresh',refreshAccessToken)
usersRoute.post('/users/sign',register)
usersRoute.post('/users/login',login)
usersRoute.patch('/updateCartItems',verifyToken,updateUserData)
usersRoute.post('/checkout',verifyToken,placeOrder)
usersRoute.patch('/verifyOrder',verifyOrder)
usersRoute.post('/userOrders',verifyToken,completeOrder)
usersRoute.delete('/logout',logOut) 
usersRoute.post('/cancel',cancelOrder)
usersRoute.delete('/deleteOrders',deleteOrders)
usersRoute.get('/users',verifyToken,(req,res)=> res.send("hello user"))

module.exports=usersRoute