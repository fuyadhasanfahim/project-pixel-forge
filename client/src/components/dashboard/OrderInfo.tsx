import { useFetchOrderByOrderIdQuery } from '@/features/orders/orderApi'
import { useParams } from 'react-router-dom'
import { Alert } from '../ui/alert'
import { useFetchUserByIdQuery } from '@/features/auth/authApi'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'

export default function OrderInfo() {
    const { orderId } = useParams<{ orderId: string }>()
    const { data, isLoading, error } = useFetchOrderByOrderIdQuery(orderId)
    const { data: user } = useFetchUserByIdQuery(data?.order?.userId)
    const [reply, setReply] = useState(false)

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

            <div
                className={`w-full max-w-7xl border rounded-lg shadow transition-all duration-500 ${
                    reply ? 'h-auto' : 'h-[400px]'
                }`}
            >
                <div>
                    <div className="bg-green-500 py-3 px-6 rounded-t-lg text-white flex justify-between items-center">
                        <h3>Order ID: {order?._id}</h3>
                        <img
                            src={user?.user?.profileImage}
                            alt="profileimage"
                            className="h-6 w-6 rounded-full ring ring-white"
                        />
                    </div>
                </div>
                <div className="space-y-4 px-6 py-4">
                    <div className="flex flex-col gap-5">
                        <div className="text-gray-600 flex gap-x-10">
                            <span>
                                <strong>User ID:</strong> {order?.userId}
                            </span>
                            <span>
                                <strong>User Name:</strong> {user?.user?.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-x-5">
                            <div>
                                <strong>Status:</strong>{' '}
                                <span className={getStatusColor(order?.status)}>
                                    {order?.status}
                                </span>
                            </div>
                            <div>
                                <strong>Delivery Date:</strong>{' '}
                                {new Date(
                                    order?.deliveryDate,
                                ).toLocaleDateString()}
                            </div>
                            <div>
                                <strong>Images:</strong> 1000
                            </div>
                            <div>
                                <strong>Price:</strong> $ 100
                            </div>
                            <div>
                                <strong>Payment Status:</strong>{' '}
                                {order?.paymentStatus}
                            </div>
                        </div>

                        <div className="flex items-start gap-x-5">
                            <div>
                                <strong>Output Format:</strong>{' '}
                                {order?.outputFormat}
                            </div>
                            <div>
                                <strong>Services:</strong>{' '}
                                {order?.services.length > 0
                                    ? order.services.join(', ')
                                    : 'No services available'}
                            </div>
                            <div>
                                <strong>Complexities:</strong>
                                <ul>
                                    {order?.complexities &&
                                        Object.entries(order.complexities).map(
                                            ([key, value]) => (
                                                <li
                                                    key={key}
                                                    className="normal-case list-disc"
                                                >
                                                    {key}: {value as string}
                                                </li>
                                            ),
                                        )}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <strong>Additional Instructions:</strong>{' '}
                            {order?.additionalInstructions || 'None'}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-x-5">
                        <div>
                            <strong>Order Submitted by:</strong>{' '}
                            {order?.username}
                        </div>
                        <Button onClick={() => setReply(!reply)}>
                            {reply ? 'Cancel Reply' : 'Reply'}
                        </Button>
                    </div>

                    {reply && (
                        <div className="mt-4 p-4 border rounded-lg bg-gray-50 transition-height duration-300">
                            <Textarea
                                className="w-full"
                                placeholder="Write your reply..."
                            />
                            <Button className="mt-2">Send Reply</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
