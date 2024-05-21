import express from "express"
import dotenv from "dotenv"
import { dbConnection } from "./DB/dbConnection.js";
import authRout from './ROUTER/auth.js'
import categoryRout from './ROUTER/categoryRout.js'
import productRout from './ROUTER/productRout.js'
import stripeRout from './ROUTER/Stripe.js'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
//import path from 'path'
import cors from 'cors'

///const __dirname = path.resolve();

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://sohal-ecom.vercel.app','http://localhost:5173'], // Add all your allowed origins here
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Include credentials
  }));
app.use(bodyParser.raw({ type: 'application/json' }));
app.use(`/api/auth`,authRout)
app.use(`/api/category`,categoryRout)
app.use('/api/product',productRout)
app.use('/api/stripe',stripeRout)

//app.use(express.static(path.join(__dirname, `/client/dist`)));

/*app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})*/

app.get('*',(req,res)=>{
    res.send({message:"Server is Wokring", success:true})
})

const PORT = process.env.PORT || 4040
app.listen(PORT,()=>{
    dbConnection()
    console.log(`Server Is Working On ${PORT}`);
})