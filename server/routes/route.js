const express =require('express')
const route = express.Router()
const {allItems,getItem,updateData,deleteItem}=require("../controllers/controller.js")


route.get('/items',allItems)
route.route('items/item/:id').get(getItem).patch(updateData).delete(deleteItem)





module.exports=route