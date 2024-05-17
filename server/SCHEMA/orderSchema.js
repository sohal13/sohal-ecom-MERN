import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    customerId:{
        type:String,
    },
    payment_intent:{
        type:String,
    },
    productsId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", 
        }
    ]
        ,
    subTotal : {
        type:Number,
        required:true
    },
    total : {
        type:Number,
        required:true
    },
    shippingAddress : {
        type: Object,
        required:true
    },
    delivery_status:{
        type:String,
        default:"pending",
        enum:["pending","processing","shipping","deliverd","cancel"]
    },
    payment_status:{
        type:String,
        required:true
    }
},{timestamps:true})

const Order = mongoose.model('Order' , orderSchema)

export default Order