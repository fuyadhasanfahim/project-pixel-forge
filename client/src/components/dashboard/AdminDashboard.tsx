import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useFetchAllOrdersQuery } from '@/features/orders/orderApi'
import IOrders from '@/types/orderInterface'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
    const { data, isLoading } = useFetchAllOrdersQuery([])
    console.log(data)
    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        )
    }

    const orders = data?.orders || []

    const topSectionOrders = orders.filter((order: IOrders) =>
        [
            'pending',
            'request for additional information',
            'inprogress',
        ].includes(order.status),
    )
    const canceledOrders = orders.filter(
        (order: IOrders) => order.status === 'canceled',
    )
    const completedOrders = orders.filter(
        (order: IOrders) => order.status === 'completed',
    )

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'bg-[#ffe5a0]'
            case 'canceled':
                return 'bg-[#b10202]'
            case 'request for additional information':
                return 'bg-[#b10202]'
            case 'completed':
                return 'bg-[#11734b]'
            case 'inprogress':
                return 'bg-[#0a53a8] text-white'
            case 'delivered':
                return 'bg-purple-500'
            default:
                return 'bg-gray-500'
        }
    }

    const renderPaymentStatus = (order: IOrders) => {
        return order.paymentStatus === 'paid' ? 'paid' : 'pending'
    }

    const renderOrders = (
        orders: IOrders[],
        showPaymentStatus: boolean = false,
    ) => {
        return orders.map((order: IOrders, index: number) => (
            <TableRow
                key={index}
                className={` ${getStatusColor(order.status)}`}
            >
                <TableCell>
                    {new Date(order.deliveryDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">{order._id}</TableCell>
                <TableCell>{order.username}</TableCell>
                <TableCell>
                    {order.services.length > 0
                        ? order.services.join(', ')
                        : 'No services available'}{' '}
                </TableCell>
                <TableCell>1000</TableCell>
                <TableCell>$ 150</TableCell>
                <TableCell>
                    <span className={`font-semibold uppercase`}>
                        {order.status}
                    </span>
                </TableCell>
                {showPaymentStatus && (
                    <TableCell className="uppercase">
                        {renderPaymentStatus(order)}
                    </TableCell>
                )}
                <TableCell>
                    <button
                        className="underline"
                        onClick={() =>
                            navigate(`/dashboard/view-order-info/${order._id}`)
                        }
                    >
                        View
                    </button>
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 space-y-4">
            <div>
                <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            </div>

            {topSectionOrders && (
                <div>
                    <div className="mb-3 text-xl">
                        Pending, In Progress , and Awaiting Additional Info
                        Orders
                    </div>
                    {topSectionOrders.length > 0 && (
                        <Table className="border rounded-md">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Delivery Date</TableHead>
                                    <TableHead className="w-[100px]">
                                        Invoice no.
                                    </TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Services</TableHead>
                                    <TableHead>Images</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Info</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className={``}>
                                {renderOrders(topSectionOrders)}
                            </TableBody>
                        </Table>
                    )}
                </div>
            )}

            {completedOrders && (
                <div>
                    <h3 className="mb-3 text-xl">Completed Orders</h3>
                    {completedOrders.length > 0 && (
                        <Table className="border rounded-md">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Delivery Date</TableHead>
                                    <TableHead className="w-[100px]">
                                        Invoice no.
                                    </TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Services</TableHead>
                                    <TableHead>Images</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Info</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-white bg-green-700">
                                {renderOrders(completedOrders, true)}
                            </TableBody>
                        </Table>
                    )}
                </div>
            )}

            {canceledOrders && (
                <div>
                    <h3 className="mb-3 text-xl">Canceled Orders</h3>
                    {canceledOrders.length > 0 && (
                        <Table className="border rounded-md">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Delivery Date</TableHead>
                                    <TableHead className="w-[100px]">
                                        Invoice no.
                                    </TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Services</TableHead>
                                    <TableHead>Images</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Info</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-white bg-red-700">
                                {renderOrders(canceledOrders)}
                            </TableBody>
                        </Table>
                    )}
                </div>
            )}
        </main>
    )
}
