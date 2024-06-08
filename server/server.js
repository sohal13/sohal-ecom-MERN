import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import { dbConnection } from "./DB/dbConnection.js";
import authRout from './ROUTER/auth.js'
import categoryRout from './ROUTER/categoryRout.js'
import productRout from './ROUTER/productRout.js'
import stripeRout from './ROUTER/Stripe.js'
import path from 'path'
//import cors from 'cors'

const __dirname = path.resolve();

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
//app.set('trust proxy', 1);

/*const allowedOrigins = ['https://sohal-ecom.vercel.app' , 'http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },// Add your allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ["set-cookie"],
    credentials: true, // Include credentials
}));
  */
//middleware
app.use(`/api/auth`,authRout)
app.use(`/api/category`,categoryRout)
app.use('/api/product',productRout)
app.use('/api/stripe',stripeRout)


app.use(express.static(path.join(__dirname, `/client/dist`)));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

/*app.get('*',(req,res)=>{
    res.send({message:"Server is Wokring", success:true})
})*/

const PORT = process.env.PORT || 4040
app.listen(PORT,()=>{
    dbConnection()
    console.log(`Server Is Working On ${PORT}`);
})