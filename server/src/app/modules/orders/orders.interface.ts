import { Types } from 'mongoose'

interface IOrders {
    _id: Types.ObjectId
    userId: Types.ObjectId
    services: string[]
    complexities: Record<string, string>
    files: string[]
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
}

export default IOrders
