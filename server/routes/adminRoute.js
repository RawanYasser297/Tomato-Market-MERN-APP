const express =require('express')
const adminRoute = express.Router()
const {createItem,allItems,getItem,updateData,deleteItem}=require("../controllers/controller.js")

adminRoute.get('/',allItems)
adminRoute.post('/createItem',createItem)
adminRoute.route('/:id').get(getItem).patch(updateData).delete(deleteItem)

module.exports=adminRoute