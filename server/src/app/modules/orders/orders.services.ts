import IOrders from './orders.interface'
import OrdersModel from './orders.model'

const createOrdersIntoDB = async (orders: Partial<IOrders>) => {
    try {
        const newOrder = new OrdersModel(orders)

        const savedOrder = await newOrder.save()

        return savedOrder
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

const getOrderByUserIdFromDB = async (userId: string) => {
    try {
        const orders = await OrdersModel.find({ userId })

        return orders
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const OrdersServices = {
    createOrdersIntoDB,
    getOrderByUserIdFromDB,
}
