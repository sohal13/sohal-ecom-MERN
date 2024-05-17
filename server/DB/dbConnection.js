import mongoose from "mongoose";

export const dbConnection =async ()=>{
    try {
        const dbconnect = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log(`DataBase Connected Successfully!!`);
    } catch (error) {
        console.log(`DB Connection Error ${error}`);
    }
}