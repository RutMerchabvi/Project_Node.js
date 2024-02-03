import Joi from "joi"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema=mongoose.Schema({
    
    userName:String,
    password:String,
    email:{type:String,unique:true},
    role:{type:String,default:"USER"},//תפקיד
    dateOfRegistration:{type:Date, default:Date.now()}//תאריך רישום לאתר
})

export const userModel=mongoose.model("users",userSchema)

export const userValidator=async (_user)=>{
    const userValidationSchema=Joi.object({
       
        userName:Joi.string().min(2).max(13).required(),
        password:Joi.string().required(),
        email:Joi.string().required(),
        role:Joi.string(),
        dateOfRegistration:Joi.date()
        


        
    })
    return userValidationSchema.validate(_user);
}

export const generetToken=(_id,role,userName)=>{

    let token=jwt.sign({_id,userName,role},
        process.env.SECRET_JWT,{
            expiresIn:"1h"
        })
        return token;
    
}