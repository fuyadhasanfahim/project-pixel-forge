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

const getOrderByOrderId: RequestHandler = async (req, res) => {
    try {
        const { orderId } = req.params

        const order = await OrdersServices.getOrderByOrderIdFromDB(orderId)

        if (!order) {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Order not found',
            })
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Order retrieved successfully',
            order,
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (error as Error).message,
            error,
        })
    }
}

const getAllOrders: RequestHandler = async (req, res) => {
    try {
        const orders = await OrdersServices.getAllOrdersFromDB()

        if (!orders || orders.length === 0) {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Orders not found',
            })
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Orders are retrieved successfully',
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

const updateOrderById: RequestHandler = async (req, res) => {
    try {
        const { orderId } = req.params
        const updateData = req.body

        if (!orderId) {
            res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Order ID is required',
            })
        }

        const updatedOrder = await OrdersServices.updateOrderByIdIntoDB(
            orderId,
            updateData,
        )

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Order updated successfully',
            order: updatedOrder,
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
    getOrderByOrderId,
    getAllOrders,
    updateOrderById,
}
