import { Router } from 'express'
import { OrdersController } from './orders.controller'

const router = Router()

router.post('/create-order', OrdersController.createOrders)
router.get('/get-order/:userId', OrdersController.getOrders)

export const OrdersRoutes = router
