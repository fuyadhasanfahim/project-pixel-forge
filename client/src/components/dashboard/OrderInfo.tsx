import { useFetchOrderByOrderIdQuery } from '@/features/orders/orderApi'
import { useParams } from 'react-router-dom'
import { Alert } from '../ui/alert'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'

export default function OrderInfo() {
    const { orderId } = useParams<{ orderId: string }>()
    const { data, isLoading, error } = useFetchOrderByOrderIdQuery(orderId)

    const order = data?.order

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-500'
            case 'canceled':
                return 'text-red-500'
            case 'completed':
                return 'text-green-500'
            case 'inprogress':
                return 'text-blue-500'
            default:
                return 'text-gray-500'
        }
    }

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <Alert>
                <p>Failed to load order details. Please try again later.</p>
            </Alert>
        )
    }

    return (
        <div className="flex flex-col items-center p-4 w-full space-y-6">
            <div className="w-full px-6">
                <h1 className="text-2xl text-start font-semibold">
                    Order Details
                </h1>
            </div>

            <Card className="w-full max-w-7xl">
                <CardHeader>
                    <CardDescription className="text-gray-600">
                        Order ID: {order?._id}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col">
                        <div>
                            <strong>User ID:</strong> {order?.userId}
                        </div>
                        <div>
                            <strong>Delivery Date:</strong>{' '}
                            {new Date(order?.deliveryDate).toLocaleDateString()}
                        </div>
                        <div>
                            <strong>Status:</strong>{' '}
                            <span className={getStatusColor(order?.status)}>
                                {order?.status}
                            </span>
                        </div>
                        <div>
                            <strong>Payment Status:</strong>{' '}
                            {order?.paymentStatus}
                        </div>
                        <div>
                            <strong>Output Format:</strong>{' '}
                            {order?.outputFormat}
                        </div>
                        <div>
                            <strong>Additional Instructions:</strong>{' '}
                            {order?.additionalInstructions || 'None'}
                        </div>
                    </div>

                    <div>
                        <strong>Services:</strong>{' '}
                        {order?.services.length > 0
                            ? order.services.join(', ')
                            : 'No services available'}
                    </div>
                    <div>
                        <strong>Images:</strong> 1000
                    </div>

                    <div>
                        <strong>Complexities:</strong>
                        <ul>
                            {order?.complexities &&
                                Object.entries(order.complexities).map(
                                    ([key, value]) => (
                                        <li key={key} className="normal-case">
                                            {key}: {value as string}
                                        </li>
                                    ),
                                )}
                        </ul>
                    </div>

                    <div>
                        <strong>By:</strong> {order?.username}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
