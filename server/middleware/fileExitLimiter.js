const path =require("path")

const fileExtLimit =(allowedExtArray)=>{
    return (req,res,next)=>{
        const files =req.files 
        const fileExtensions=[]

        Object.keys(files).forEach(key=>{
            fileExtensions.push(path.extname(files[key].name));
        })
        const allowed =fileExtensions.every(ext=> allowedExtArray.includes(ext))

        if(!allowed){
const message =`Upload failed. only ${allowedExtArray.toString()} files allowed. `.replace(",",",")

return res.status(422).json({message})

        }
        next()
    }

    
}

module.exports = fileExtLimit