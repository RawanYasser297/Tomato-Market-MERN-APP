const Item =require('../model/Item')



//create new book 

const createItem =async(req,res)=>{
    
    const imgFile=req.file
    const {title,price,about,offer,category,rating}=req.body
    const image=imgFile.path
console.log(image)
    if(rating>5){
        return res.status(400).send({message:'Rating should be between 1 and 5'})
    }
    try{
        const item =await Item.create({title,image,price,about,offer,category,rating})
        console.log(item)
        res.status(200).json({item})
        
       
    }catch(err){
        res.status(500).json({error:err})
    }
}

const allItems =async(req,res)=>{
    try{
        const items =await Item.find({})
        res.status(200).json({numbers:items.length,items})
    }catch(err){
        res.status(500).json({error:err})
    }
}

const getItem =async(req,res)=>{
    const id=req.params.id
    try{
        const dish =await Item.findOne({_id:id})
        res.status(200).json({dish})
    }catch(err){
        res.status(500).json({error:err})
    }
}


const updateData =async(req,res)=>{
    const id=req.params.id
    try{
        const item =await Item.findByIdAndUpdate({_id:id}, req.body);
        res.status(200).json({item})
    }catch(err){
        res.status(500).json({error:err})
    }
}



const deleteItem =async(req,res)=>{
    const {id}=req.params
    try{
        const item =await Item.findByIdAndDelete({_id:id});
        res.status(200).json({msg:`delete ${item.title}`})
    }catch(err){
        res.status(500).json({error:err})
    }
}









module.exports = {createItem,allItems,getItem,updateData,deleteItem}