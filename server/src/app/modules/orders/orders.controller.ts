import { RequestHandler } from 'express'
import { OrdersServices } from './orders.services'
import httpStatus from 'http-status'

const createOrders: RequestHandler = async (req, res) => {
    try {
        const orders = req.body

        const createdOrder = await OrdersServices.createOrdersIntoDB(orders)

        res.status(httpStatus.CREATED).json({
            success: true,
            message: 'Order created successfully',
            order: createdOrder,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getOrders: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params

        const orders = await OrdersServices.getOrderByUserIdFromDB(userId)

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Orders retrieved successfully',
            orders,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

export const OrdersController = {
    createOrders,
    getOrders,
}
