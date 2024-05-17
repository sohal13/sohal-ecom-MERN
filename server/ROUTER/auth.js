import express from "express"
import { allgetUserControler, loginControler, registerControler, testControler, userLogOut } from "../ROUTCONTROLER/authControler.js";
import { isAdmin, userVerify } from "../MIDDLEWARE/authMiddleware.js";

const router = express.Router();

router.post('/register',registerControler)

router.post('/login',loginControler)

router.get('/test',userVerify ,isAdmin, testControler)

router.get('/alluser',userVerify ,isAdmin, allgetUserControler)

router.post('/logout',userLogOut)




export default router