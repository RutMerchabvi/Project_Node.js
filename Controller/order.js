import Joi from "joi";
import mongoose from "mongoose";
import { orderModel, orderValidator } from "../Model/order.js";

export const getAllOrders=async(req,res)=>{
    try{
        let allOrders=await orderModel.find({userId:req.user._id})
        res.json(allOrders);
  }
    catch(err){
        res.status(400).json({type:"invalid opartion",message:"sorry cannot get orders"})

    }
}

export const deleteOrder=async(req,res)=>{
    let{id}=req.params;
    try{
        if(!mongoose.isValidObjectId(id))
             return res.status(400).json({type:"not valid id",message:"id not in right format"})
        let order=await orderModel.findById(id);
    
         if(!order)
        return res.status(404).json({type:"no order to delete",message:"no order with such id to delete"})

        if(req.user.role!="ADMIN"&&order.userId!=req.user._id)
            res.status(403).json({type:"not allowed",message:"you are not allowed to delete order only manager or if you added this order"})
        if(order.setOff)
        res.status(403).json({type:"not allowed ",message:"you are not to delete order that not set off"}) 
         
        order=await orderModel.findByIdAndDelete(id)
            return res.json(order);
           
    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid operation",message:"sorry cannot get order"})
    }
}



export const addOrder=async(req,res)=>{
    let{orderDate,dueDate,orderingDetails, orderAdress,product,setOff}=req.body;
    let result=await orderValidator(req.body)
    console.log(result)
    if(result.error)
    return res.status(404).json({type:"invalid data ",message:result.error.details[0].message})
    try{
        let newOrder=new orderModel({orderDate,dueDate,orderingDetails, orderAdress,product,setOff,userId:req.user.id})
        await newOrder.save()
        return res.json(newOrder)

    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid operation",message:"sorry cannot add order"})

    }



}


export const updateOrder=async(req,res)=>{
    let{id}=req.params;
    if(!mongoose.isValidObjectId(id))
    return res.status(400).json({type:"no valid id", massage:"id  not in right format"})

    if(req.user.role!="ADMIN")
res.status(403).json({type:"not allowed",message:"you are not allowed to update order only manager "})
try{
    let order=await orderModel.findById(id);
    if(!order)
    return res.status(404).json({type:"order not found",massage:"no order with such id"})
req.body.setOff=true
let updated=await orderModel.findByIdAndUpdate(id,req.body,{new:true})//לtrue איך מעדכנים את השדרה יצא לדרך
return res.json(updated);
}
catch(err){
    console.log(err)
    res.status(400).json({type:"invalid opartion",massage:
    "sorry cannot get order"})
}


}


