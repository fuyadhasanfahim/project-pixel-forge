import { RequestHandler } from 'express'
import { OrdersServices } from './orders.services'

const createOrders: RequestHandler = async (req, res) => {
    try {
        const orders = req.body

        const createdOrder = await OrdersServices.createOrdersIntoDB(orders)

        res.status(201).json({
            message: 'Order created successfully',
            order: createdOrder,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create order',
            error,
        })
    }
}

export const OrdersController = {
    createOrders,
}
