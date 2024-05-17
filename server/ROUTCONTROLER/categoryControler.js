import slugify from "slugify";
import Category from "../SCHEMA/categorySchema.js";

export const createCategory =async(req,res)=>{
    try {
        const {name , photo} = req.body;
        if(!name){
            return res.send({message:"Enter The Name",success:false})
        }
        if(!photo){
            return res.send({message:"Enter The Photo",success:false})
        }
        const categoryExist = await Category.findOne({name});
        if(categoryExist){
            return res.send({message:"Category Alredy Exist",success:false})
        }
        const category = new Category({
            name:name,
            photo:photo,
            slug:slugify(name)
        })
        await category.save();
        res.status(201).send({
            message:"New Category Created",
            success:true,
            category
        })
    } catch (error) {
        console.log(`error in createCategoryControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const updateCategory=async(req,res)=>{
    try {
        const {id} = req.params
        console.log(req.body);
        const category = await Category.findByIdAndUpdate(id,
            req.body
            ,{new:true})
            if (req.body.name) {
                const newName = String(req.body.name); 
                category.slug = slugify(newName)
                await category.save();
            }

        res.status(200).send({
            message:"Category Updated Succesfully",
            success:true,
            category
        })
    } catch (error) {
        console.log(`error in updateCategoryControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const getAllCategory=async(req,res)=>{
    try {
        const category = await Category.find({});
        res.status(200).send({
            message:"All Category List",
            success:true,
            category
        })
    } catch (error) {
        console.log(`error in categoryControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const getSingleCategory=async(req,res)=>{
    try {

        const category = await Category.findOne({slug: req.params.slug});
        res.status(200).send({
            message:"single Category ",
            success:true,
            category
        })
    } catch (error) {
        console.log(`error in SinglecategoryControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const deletCategory=async(req,res)=>{
    try {
        const {id} = req.params
        const category = await Category.findByIdAndDelete(id);
        res.status(200).send({
            message:"Category Deleted",
            success:true,
            category
        })
    } catch (error) {
        console.log(`error in deletedcategoryControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}