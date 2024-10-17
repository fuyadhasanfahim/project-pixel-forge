import { Router } from 'express'
import { OrdersController } from './orders.controller'

const router = Router()

router.post('/create-order', OrdersController.createOrders)
router.get('/get-order/:userId', OrdersController.getOrders)
router.get(
    '/get-order-by-order-id/:orderId',
    OrdersController.getOrderByOrderId,
)
router.get('/get-all-orders', OrdersController.getAllOrders)

export const OrdersRoutes = router
