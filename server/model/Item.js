const mongoose =require('mongoose')

const itemsSchema =mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        category:{
            type:String,
        },
        rating:{
            type:Number,
        },
        price:{type:Number},

        image:{
            type:String,
        },
        about:{
            type:String,
        },
        offer:{
            type:Number,
        }
        

    },
{
  timestamps: true
}

);



module.exports =mongoose.model('Items',itemsSchema)
