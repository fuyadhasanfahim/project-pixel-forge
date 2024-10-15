import { Schema } from 'mongoose'
import IOrders from './orders.interface'

const OrdersSchema = new Schema<IOrders>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        services: {
            type: [String],
            required: true,
        },
        complexities: {
            type: Map,
            of: String,
            required: true,
        },
        files: {
            type: String,
            required: true,
        },
        additionalInstructions: {
            type: String,
            required: false,
        },
        outputFormat: {
            type: String,
            enum: ['JPEG', 'PNG', 'TIFF', 'PSD', 'GIF', 'RAW', 'SVG', 'WEBP'],
            required: true,
        },
        deliveryDate: { type: Date, required: true },
        status: {
            type: String,
            enum: [
                'pending',
                'inprogress',
                'delivered',
                'completed',
                'revision',
                'canceled',
                'request for additional information',
            ],
            default: 'pending',
            required: true,
        },
    },
    { timestamps: true },
)

export default OrdersSchema
