//we have a separate  route that was going to upload pdf files oe excel files 
const filePayLoadExist =(req,res,next)=>{
    if(!req.files) return res.status(400).json({massage:"erorr filePayLoadExist"})
        next()
}

module.exports =filePayLoadExist