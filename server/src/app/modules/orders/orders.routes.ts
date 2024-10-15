import { Router } from 'express'
import { OrdersController } from './orders.controller'

const router = Router()

router.post('/create-orders', OrdersController.createOrders)

export const OrdersRoutes = router
