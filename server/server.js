import express from "express"
import dotenv from "dotenv"
import { dbConnection } from "./DB/dbConnection.js";
import authRout from './ROUTER/auth.js'
import categoryRout from './ROUTER/categoryRout.js'
import productRout from './ROUTER/productRout.js'
import stripeRout from './ROUTER/Stripe.js'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.raw({ type: 'application/json' }));
app.use(`/api/auth`,authRout)
app.use(`/api/category`,categoryRout)
app.use('/api/product',productRout)
app.use('/api/stripe',stripeRout)



const PORT = process.env.PORT || 4040
app.listen(PORT,()=>{
    dbConnection()
    console.log(`Server Is Working On ${PORT}`);
})