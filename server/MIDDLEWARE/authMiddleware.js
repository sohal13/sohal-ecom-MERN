import User from "../SCHEMA/userSchema.js";
import JWT from 'jsonwebtoken'

export const userVerify=async(req,res,next)=>{
    const token = req.cookies.accesToken;
    if(!token) return res.send({success:false ,message:"User not Authorized"}).status(401)

    JWT.verify(token ,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.send({success:false , message:"Uncot Error Middleware"}).status(403)
        req.user = user;
        next();
    });
}


//admin access

export const isAdmin =async (req,res,next)=>{
    try {
        const user = await User.findById(req.user.id)
        if(user.role !== 1){
            return res.send({success:false , message:"UnAuthorized Admin Access"}).status(401)
        }else{
            next()
        }
    } catch (error) {
        console.log(`in isAdmin Middleware ${error}`);
    }
}