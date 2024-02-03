import express from "express"
import { addProduct,getAllProduct,getProductById,deleteProduct,updateProduct } from "../Controller/product.js";
import {auth,authAdmin} from "../Middlewares/auth.js"
const router=express.Router();
router.get("/",getAllProduct);
router.get("/:id",getProductById);
router.delete("/:id",authAdmin,deleteProduct);
router.post("/",authAdmin,addProduct);
router.put("/:id",auth,updateProduct);

export default router;