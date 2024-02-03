import express from "express";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import orderRouter from "./Routes/order.js";
import { connectToDB } from "./DB/connectToMongoDb.js";
import { config } from "dotenv";
import cors from "cors";
import{errorHandling} from "./Middlewares/errorHandling.js";

// const printDate=(req,res,next)=>{
//     console.log("a new request in",Date.now())
//     next()
// }
// const addData=(req,res,next)=>{
//     req.xxx={name:"ester"};
//     next();
// }
const app=express();
app.use(cors())
app.use(express.json());
connectToDB();
config();
app.use("api/all",express.static("files"))
app.use("/api/user",userRouter);
app.use("/api/order",orderRouter);
app.use("/api/product",productRouter);
app.use(errorHandling)

let port=process.env.PORT||3500;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})
