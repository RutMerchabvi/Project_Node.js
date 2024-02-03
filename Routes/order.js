import express from "express";
import {getAllOrders,deleteOrder,addOrder,updateOrder} from "../Controller/order.js";
import{auth,authAdmin} from "../Middlewares/auth.js";

const router=express.Router();
router.get("/",auth,getAllOrders);
router.delete("/:id",auth,deleteOrder);
router.post("/",addOrder);
router.put("/:id",authAdmin,updateOrder);

export default router;