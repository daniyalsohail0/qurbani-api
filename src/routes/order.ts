import Router from "express"
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "../controllers/order";

const orderRouter = Router()

orderRouter.post('/order', createOrder)

orderRouter.get('/order', getOrders)

orderRouter.get('/order/:id', getOrderById)

orderRouter.put('/order/:id', updateOrder)

orderRouter.delete('/order/:id', deleteOrder)

export default orderRouter;