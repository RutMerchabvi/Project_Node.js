import Joi from "joi";
import mongoose from "mongoose";


const minimalProductSchema=mongoose.Schema({
    productName:String,
    amount:Number
}) 

const orderSchema=mongoose.Schema({
    userId:String,
    orderDate:{type:Date,default:Date.now()},
    dueDate:{type:Date,default:Date.now()},//תאריך יעד
     orderAdress:String,
    product:[minimalProductSchema],
    setOff:{type:Boolean,default:false}//הזמנה יצאה לדרך
})
export const orderModel=mongoose.model("orders",orderSchema);

export const orderValidator=async(_order)=>{
    const orderValidationSchema=Joi.object({
       userId:Joi.string(),
        orderDate:Joi.date(),
        dueDate:Joi.date(),
        orderingDetails:({userName:Joi.string().min(2).max(13)}),
        orderAdress:Joi.string().min(10).max(30),
        product:({ productName:Joi.string().min(2).max(10).required(), amount:Joi.number().min(1).required()}),
        setOff:Joi.boolean()
       
    })
    return orderValidationSchema.validate(_order);
}