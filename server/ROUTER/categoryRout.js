import express from "express"
import { isAdmin, userVerify } from "../MIDDLEWARE/authMiddleware.js";
import { createCategory, deletCategory, getAllCategory, getSingleCategory, updateCategory } from "../ROUTCONTROLER/categoryControler.js";

const router = express.Router();

router.post ('/create-category',userVerify , isAdmin , createCategory)

router.put('/update/:id',userVerify , isAdmin , updateCategory)

router.get('/categoryes',getAllCategory)

router.get('/:slug',getSingleCategory)

router.delete('/delete/:id',userVerify , isAdmin ,deletCategory)





export default router