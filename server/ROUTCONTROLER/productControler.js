import slugify from "slugify";
import Product from "../SCHEMA/productSchema.js";
import { v4 as uuidv4 } from 'uuid';
import Category from "../SCHEMA/categorySchema.js";
import Order from "../SCHEMA/orderSchema.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, photo, shipping, username } = req.body;
        switch (true) {
            case !name:
                return res.send({ message: "Enter The Name", success: false })
            case !description:
                return res.send({ message: "Enter The Description", success: false })
            case !price:
                return res.send({ message: "Enter The Price", success: false })
            case !category:
                return res.send({ message: "Enter The Category", success: false })
            case !quantity:
                return res.send({ message: "Enter The Quantity", success: false })
            case !username:
                return res.send({ message: "Enter The UserName", success: false })
        }
        if (username !== req.user.id) {
            return res.send({ message: "Only Admin Can List product", success: false })
        }

        // Generate a unique slug using name and timestamp
        const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '');
        const randomString = uuidv4().split('-').join('').substr(0, 6);
        const uniqueSlug = `${slugify(name)}-${timestamp}-${randomString}`;

        const product = new Product({
            name,
            slug: uniqueSlug,
            description,
            price,
            category,
            quantity,
            photo,
            shipping,
            username
        })
        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Listed Succesfully!!",
            product
        })
    } catch (error) {
        console.log(`error in createProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find({}).populate("category").limit(8).sort({ createdAt: -1 });
        if (!product) {
            return res.send({ message: "No Product Exist List Product", success: false })
        }
        res.status(200).send({
            success: true,
            totalCount: product.length,
            message: "All Product",
            product,
        })
    } catch (error) {
        console.log(`error in getAllProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).populate("category");
        if (!product) {
            return res.send({ message: "product showing error", success: false })
        }
        res.status(200).send({
            success: true,
            message: "Single Product",
            product
        })
    } catch (error) {
        console.log(`error in getSingleProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}


export const searchProduct = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const search = req.query.search || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const product = await Product.find({
            name: { $regex: search, $options: 'i' },
            description: { $regex: search, $options: 'i' },
        }).sort({ [sort]: order }).limit(limit).skip(startIndex);

        return res.status(200).send(
            product
        )

    } catch (error) {
        console.log(`error in getSearchProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.body);
        const product = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true });
        res.status(200).send({
            success: true,
            message: "Update Product Succesfully!1",
            product
        })
    } catch (error) {
        console.log(`error in updateProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "All Product",
        })
    } catch (error) {
        console.log(`error in deleteProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}


export const relatedProduct = async (req, res) => {
    try {
        const { pid, cid } =await req?.params
        const product = await Product.find({
            category: cid,
            _id: { $ne: pid }
        }).limit(4).populate("category")
        res.status(200).send({
            success: true,
            message: "Related Product",
            product
        })
    } catch (error) {
        console.log(`error in relatedProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}


export const getProductbyCatgeory=async(req,res)=>{
    try {

        const category = await Category.findOne({slug:req.params.slug})
        const product = await Product.find({category}).populate('category')
        res.status(200).send({
            success: true,
            message: "Category Product",
            category,
            product
        })

    } catch (error) {
        console.log(`error in categoryProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const getMyOrder=async(req,res)=>{
try {
    const userOrder = await Order.find({
        userId:req.user.id
    }).populate("productsId").sort({ createdAt: -1 })
    if (!userOrder) {
        return res.status(404).send({ success: false, message: "no Order  found" });
    }
    res.send({ success: true, userOrder }).status(200);
} catch (error) {
    console.log(`error in myorderProductControler ${error}`);
    res.status(500).send({
        success: false,
        message: "Internul Server Error"
    })
}
}

export const getMyOrderDetail=async(req,res)=>{
    try {
        const {id} = req.params
        const userOrder = await Order.findOne({
           _id:id
        }).populate("productsId").sort({ createdAt: -1 })
        if (!userOrder) {
            return res.status(404).send({ success: false, message: "no Order  found" });
        }
        res.send({ success: true, userOrder }).status(200);
    } catch (error) {
        console.log(`error in myorderProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
    }



export const getallOrderDetail=async(req,res)=>{
    try {
        const orders = await Order.find({}).populate("productsId").sort({ createdAt: -1 })
        if(!orders) return res.status(404).send({ success: false, message: "no Order  found" });
        res.send({success: true, orders }).status(200)
    } catch (error) {
        console.log(`error in allorderProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}


export const updateOrderDetail=async(req,res)=>{
    try {
        const {id} = req.params
        const {orderStatus} = req.body
        const orders = await Order.findByIdAndUpdate(id,{delivery_status:orderStatus},{new:true}).populate("productsId").sort({ createdAt: -1 })
        res.send({success: true, orders , message:"Delivery Status Updated!!" }).status(200)
    } catch (error) {
        console.log(`error in orderUpdateProductControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}