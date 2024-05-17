import mongoose from "mongoose";
import { type } from "os";

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

const User = mongoose.model('User' , userSchema)

export default User