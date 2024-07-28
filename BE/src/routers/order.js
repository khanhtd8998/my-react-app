import { Router } from "express";
import { authMiddleware } from "../middleware/checkAuth";
import { getCartMiddleware } from "../controllers/cart";
import { createOrderFromCart, getOrderUser } from "../controllers/order";

const orderRouter = Router();
getOrderUser
orderRouter.use('/', authMiddleware, getCartMiddleware)
orderRouter.post('/orders', createOrderFromCart)
orderRouter.get('/orders', getOrderUser)

export default orderRouter