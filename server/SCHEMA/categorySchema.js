import mongoose from "mongoose";
import { type } from "os";

const categorySchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    photo:{
        type:Array,
        required:true
    },
},{timestamps:true})

const Category = mongoose.model('Category' , categorySchema)

export default Category