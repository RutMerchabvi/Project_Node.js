import Joi from "joi";
import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    
    productName:String,
    price:Number,
    description:String,//תאור
    manufacturingdate:{type:Date,default:Date.now()},// תאריך ייצור
    img:String
   
})

export const productModel=mongoose.model("products",productSchema);

export const productValidator=(_product)=>{
    const productValidationSchema=Joi.object({
      
        productName:Joi.string().min(2).max(10).required(),
        price:Joi.number().min(10).max(20000).required(),
        description:Joi.string().min(25).max(180).required(),
        manufacturingdate:Joi.date(),
        img:Joi.string().required()

    })
    return productValidationSchema.validate(_product);
}