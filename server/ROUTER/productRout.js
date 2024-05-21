import express from "express"
import { isAdmin, userVerify } from "../MIDDLEWARE/authMiddleware.js";
import { createProduct, deleteProduct, getAllProduct, getProduct, relatedProduct, searchProduct, updateProduct , getProductbyCatgeory, getMyOrder, getMyOrderDetail, getallOrderDetail, updateOrderDetail } from "../ROUTCONTROLER/productControler.js";

const router = express.Router();

router.post('/create',userVerify,isAdmin,createProduct)

router.get('/getall', getAllProduct)

router.get('/get/:slug', getProduct)

router.get('/search', searchProduct)

router.get('/related/:pid/:cid', relatedProduct)

router.put('/update/:id',userVerify,isAdmin,updateProduct)

router.delete('/delete/:id',userVerify,isAdmin,deleteProduct)

router.get('/bycategory/:slug' , getProductbyCatgeory)

router.get('/myorders',userVerify,getMyOrder)

router.get('/myorders/details/:id',userVerify,getMyOrderDetail)

//admin all orders
router.get('/allorders',userVerify,isAdmin,getallOrderDetail)

//admin order status update
router.put('/order-update/:id',userVerify,isAdmin,updateOrderDetail)




export default router