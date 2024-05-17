import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        lowercase:true,
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        type:Array,
        required:true
    },
    shipping:{
        type:Boolean,
    },
    username:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema)

export default Product;