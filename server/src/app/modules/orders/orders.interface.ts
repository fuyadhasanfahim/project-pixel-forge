import { Types } from 'mongoose'

interface IOrders {
    _id: Types.ObjectId
    userId: Types.ObjectId
    username: string
    services: string[]
    complexities: Record<string, string>
    additionalInstructions: string
    outputFormat: string
    deliveryDate: Date
    status:
        | 'pending'
        | 'inprogress'
        | 'delivered'
        | 'completed'
        | 'revision'
        | 'canceled'
        | 'request for additional information'
    paymentStatus: 'pending' | 'paid'
}

export default IOrders
