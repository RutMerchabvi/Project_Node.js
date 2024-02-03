import mongoose from "mongoose"
import { productModel,productValidator } from "../Model/product.js"

export const getAllProduct=async(req,res)=>{
let txt=req.query.txt||undefined;
let page=req.query.page||1;
let perpage=req.query.perpage||20;


    try{
        let allProducts=await productModel.find({$or:
            [ {productName:txt},{price:txt},{description:txt},{manufacturingdate:txt},{img:txt}]})
            .skip(page*perpage).limit(perpage);
        res.json(allProducts)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get products" })
    }
}
export const getProductById=async(req,res)=>{
    let {id}=req.params;
    try{
        if(!mongoose.isValidObjectId(id)){
            res.status(400);
            throw new Error('קוד לא הגיוני')
        }
        let product=await productModel.findById(id);
        if(!product)
            return res.status(404).json({type:"no id",massage:"no product with such id"})
            return res.json(product)
    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid opartion",massage:"sorry cannot get product"})
    }
}

export const deleteProduct=async(req,res)=>{
    let{id}=req.params;
    try{
        if(!mongoose.isValidObjectId(id))
        return res.status(400).json({type: "not valid id",massage:"id not in right format"})
    let product=await productModel.findByIdAndDelete(id);
    if(!product)
        return res.status(404).json({type:"no product to delete",massage:"no product with such id to delete"})
        return res.json(product)
    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid opartion ",massage:"sorry get product" })
    }
}

export const addProduct=async(req,res)=>{
    let{productName,price,description, manufacturingdate,img}= req.body;
    const result=await productValidator(req.body)
    console.log(result)
    if(result.error)
    return res.status(404).json({type:"invalid data ",message:result.error.details[0].message})
 try{
        let sameProduct=await productModel.findOne({productName:productName});
        if(sameProduct)
            return res.status(409).json({type:"same details",massage:"there is already same same producte"})
        let newProduct=new productModel({productName,price,description, manufacturingdate,img});
        await newProduct.save();
        return res.json(newProduct)

    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid opartion",massage:"sorry cannot get product"})
    }}
export const updateProduct=async(req,res)=>{
    let{id}=req.params;
    if(!mongoose.isValidObjectId(id))
    return res.status(400).json({type:"no valid id", massage:"id  not in right format"})
try{
    let product=await productModel.findById(id);
    if(!product)
    return res.status(404)({type:"product not found",massage:"no product with such id"})

let updated=await productModel.findByIdAndUpdate(id,req.body,{new:true})
return res.json(updated);
}
catch(err){
    console.log(err)
    res.status(400).json({type:"invalid opartion",massage:
    "sorry cannot get product"})
}
}
    





