import bcryptjs from 'bcryptjs';
import User from '../SCHEMA/userSchema.js'
import jwt from 'jsonwebtoken'

//register RoutControler
export const registerControler = async (req,res) => {
    try {
        const { name, email, phone, password } = req.body;
        if(!name){
            return res.send({message:"Enter The Name",success:false})
        }
        if(!email){
            return res.send({message:"Enter The Email",success:false})
        }
        if(!phone){
            return res.send({message:"Enter The Phone No.",success:false})
        }
        if(!password){
            return res.send({message:"Enter The Password",success:false})
        }
        const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: 'PhoneNo. or email  is already Registered Please Login',
            });
        } else {
            const hashPassowrd = bcryptjs.hashSync(password, 10);
            const newUser = new User({ name, email, phone, password:hashPassowrd })
            await newUser.save();
            const {password:pass, ...rest}=newUser._doc;
            res.status(201).send({
                success: true,
                message: "User created Succesfully",
               rest
            })
        }
    }
    catch (error) {
        console.log(`error in registerControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}


//Login routControler

export const loginControler =async(req,res)=>{
    try {
        const {email , password} = req.body;
        if(!email){
            return res.send({message:"Enter The Email",success:false})
        }
        if(!password){
            return res.send({message:"Enter The Password",success:false})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.send({
                success:false,
                message:"Password or Email not matched!!"
            }).status(404)
        }
        const matchPassword = await bcryptjs.compare(password,user.password)
        if(!matchPassword){
            return res.send({
                success:false,
                message:"Password or Email not matched!!"
            }).status(401)
        }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '100 years' });
        const { password: pass, ...rest } = user._doc;

        res.cookie('accessToken', token, { // Corrected cookie name
            httpOnly: true,
            expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
            sameSite: 'None' ,
            secure: process.env.NODE_ENV === 'production', 
        })
        .status(200).send({
            success:true,
            message:"User Login Succesfull",
            token,
            rest
        });
    } catch (error) {
        console.log(`error in LoginControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

//testControler

export const testControler=(req,res)=>{
    try {
        console.log(req.user);
        console.log("middleware");
    } catch (error) {
        console.log(error);
    }
}

//logout

export const userLogOut=async(req,res)=>{
    
    try {
        res.cookie("accessToken",'',{
            maxAge:0
        })
        res.status(200).send({success:true ,message:"User LogOut"})

    } catch (error) {
        console.log(`error in LogOutControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}

export const allgetUserControler=async(req,res)=>{
    try {
     const users = await User.find({role: 0 }).sort({createdAt: -1});
        res.status(200).send({users, success:true})
    } catch (error) {
        console.log(`error in getAllUserControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}


//user verify 
export const verifyUserControler=async(req,res)=>{
    const userdata = await User.findById(req.user.id)
    if(!userdata) return res.send({success:false, message:"Login First"}).status(200)
    const { password, ...user } = userdata.toObject();
    res.send({user , success:true}).status(200)
}

export const getUserControler=async(req,res)=>{
    try {
        const {id} = req.params;
        const singleUser = await User.findById(id)
        const { password, ...user } = singleUser.toObject();
        res.status(200).send({
            success: true,
            message: "Update User Succesfully!1",
            user
        })
    } catch (error) {
        console.log(`error in updateUserControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}


export const UpdateUserControler=async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(id ,{...req.body},{new:true})
        const { password, ...user } = updatedUser.toObject();
        res.status(200).send({
            success: true,
            message: "Update User Succesfully!1",
            user
        })
    } catch (error) {
        console.log(`error in updateUserControler ${error}`);
        res.status(500).send({
            success: false,
            message: "Internul Server Error"
        })
    }
}


